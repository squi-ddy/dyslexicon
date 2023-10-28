'''
EfficientSpeech: An On-Device Text to Speech Model
https://ieeexplore.ieee.org/abstract/document/10094639
Rowel Atienza
Apache 2.0 License
2023
'''

import os
import json
import models.hifigan as hifigan
import torch
import torch.nn as nn
import math

from lightning import LightningModule
from torch.optim import AdamW
from scipy.io import wavfile
from torch.optim.lr_scheduler import CosineAnnealingLR, LambdaLR
from text.symbols import symbols
from einops import reduce, repeat
import torch.nn.functional as F
from synthesize import text2phoneme
import numpy as np
import time


class MixFFN(nn.Module):
    def __init__(
        self,
        dim,
        expansion_factor,
    ):
        super().__init__()
        hidden_dim = dim * expansion_factor
        self.mlp1 = nn.Linear(dim, hidden_dim)
        self.conv = nn.Conv1d(hidden_dim, hidden_dim, 3, padding=1)
        self.mlp2 = nn.Linear(hidden_dim, dim)
        self.act = nn.GELU()
        

    def forward(self, x):
        x = self.mlp1(x)
        x = x.permute(0, 2, 1)
        x = self.conv(x)
        x = x.permute(0, 2, 1)
        x = self.act(x)
        x = self.mlp2(x)
        return x


class SelfAttention(nn.Module):
    def __init__(self, dim, num_heads=1, qkv_bias=False):
        super().__init__()
        assert dim % num_heads == 0, 'dim should be divisible by num_heads'
        self.num_heads = num_heads
        head_dim = dim // num_heads
        self.scale = head_dim ** -0.5

        self.qkv = nn.Linear(dim, dim * 3 * num_heads, bias=qkv_bias)
        self.proj = nn.Linear(dim * num_heads, dim)

    def forward(self, x, mask=None, pool=1):
        B, N, C = x.shape
        qkv = self.qkv(x).reshape(B, N, 3, self.num_heads, C).permute(2, 0, 3, 1, 4)
        # qkv dim is [3, B, num_heads, N, C]
        q, k, v = qkv.unbind(0)   # make torchscript happy (cannot use tensor as tuple)

        attn = (q @ k.transpose(-2, -1)) * self.scale
        attn_mask = None
        if mask is not None:
            if pool > 1:
                mod = mask.shape[-1] % pool
                if mod > 0:
                    pad = [0, int(pool-mod)]
                    mask = F.pad(mask, pad, value=True)
                mask = reduce(mask, 'b (n p) -> b n', 'max', p=pool)

            attn_mask = mask.unsqueeze(1).expand(-1, attn.shape[-1], -1)
            attn_mask = attn_mask.repeat(self.num_heads, 1, 1) 
            attn_mask = attn_mask.reshape(-1, self.num_heads, attn_mask.shape[-2], attn_mask.shape[-1])

        attn = attn.softmax(dim=-1)

        x = (attn @ v).transpose(1, 2).reshape(B, N, -1)
        x = self.proj(x)
        
        if mask is not None:
            attn_mask = repeat(mask, 'b n -> b n a', a=x.shape[-1])

        return x, attn_mask

class Encoder(nn.Module):
    """ Phoneme Encoder """

    def __init__(self, depth=2, embed_dim=128, kernel_size=3, \
                 expansion=1, reduction=4, head=1,):
        super().__init__()

        small_embed_dim = embed_dim // reduction
        dim_ins = [small_embed_dim*(2**i) for i in range(depth-1)]
        dim_ins.insert(0, embed_dim)
        self.dim_outs = [small_embed_dim*2**i for i in range(depth)]
        heads = [head*(i+1) for i in range(depth)]
        kernels = [kernel_size-(2 if i > 0 else 0) for i in range(depth)]
        paddings = [k//2 for k in kernels]
        strides = [2 for _ in range(depth-1)]
        strides.insert(0, 1)
        
        self.embed = nn.Embedding(len(symbols) + 1, embed_dim, padding_idx=0)
        
        self.attn_blocks = nn.ModuleList([])
        for dim_in, dim_out, head, kernel, stride, padding in zip(dim_ins, self.dim_outs,\
                                                                  heads, kernels, strides, paddings):
            self.attn_blocks.append(
                    nn.ModuleList([
                        #depthwise separable-like convolution
                        nn.Conv1d(dim_in, dim_in, kernel_size=kernel, stride=stride, \
                                  padding=padding, bias=False),
                        nn.Conv1d(dim_in, dim_out, kernel_size=1, bias=False), 
                        SelfAttention(dim_out, num_heads=head),
                        MixFFN(dim_out, expansion),
                        nn.LayerNorm(dim_out),
                        nn.LayerNorm(dim_out),
                        ]))

    def get_feature_dims(self):
        return self.dim_outs

    def forward(self, phoneme, mask=None):
        features = []
        x = self.embed(phoneme) 
        # merge, attn and mixffn operates on n or seqlen dim
        # b = batch, n = sequence len, c = channel (1st layer is embedding)
        # (b, n, c)
        n = x.shape[-2]
        decoder_mask = None
        pool = 1

        for merge3x3, merge1x1, attn, mixffn, norm1, norm2 in self.attn_blocks:
            # after each encoder block, merge features
            x = x.permute(0, 2, 1)
            x = merge3x3(x)
            x = merge1x1(x)
            x = x.permute(0, 2, 1)
            # self-attention with skip connect
            if mask is not None:
                pool = int(torch.round(torch.tensor([n / x.shape[-2]], requires_grad=False)).item())
            
            y, attn_mask = attn(x, mask=mask, pool=pool)
            x = norm1(y + x)
            if attn_mask is not None:
                x = x.masked_fill(attn_mask, 0)
                if decoder_mask is None:
                    decoder_mask = attn_mask
           
            # Mix-FFN with skip connect
            x = norm2(mixffn(x) + x)
            
            if attn_mask is not None:
                x = x.masked_fill(attn_mask, 0)
            # mlp decoder operates on c or channel dim
            features.append(x)

        return features, decoder_mask


class AcousticDecoder(nn.Module):
    """ Pitch, Duration, Energy Predictor """

    def __init__(self, dim, 
                 pitch_stats=None, 
                 energy_stats=None,
                 n_mel_channels=80, 
                 duration=False):
        super().__init__()
        
        self.n_mel_channels = n_mel_channels

        self.conv1 = nn.Sequential(nn.Conv1d(dim, dim, kernel_size=3, padding=1), nn.ReLU())
        self.norm1 = nn.LayerNorm(dim)
        self.conv2 = nn.Sequential(nn.Conv1d(dim, dim, kernel_size=3, padding=1), nn.ReLU())
        self.norm2 = nn.LayerNorm(dim)
        self.linear = nn.Linear(dim, 1)
        self.duration = duration
        
        if pitch_stats is not None:
            pitch_min, pitch_max = pitch_stats
            self.pitch_bins = nn.Parameter(torch.linspace(pitch_min, pitch_max, dim - 1),\
                                           requires_grad=False,)
            self.pitch_embedding = nn.Embedding(dim, dim)
        else:
            self.pitch_bins = None
            self.pitch_embedding = None

        if energy_stats is not None:
            energy_min, energy_max = energy_stats
            self.energy_bins = nn.Parameter(torch.linspace(energy_min, energy_max, dim - 1), \
                                            requires_grad=False,)
            self.energy_embedding = nn.Embedding(dim, dim)
        else:
            self.energy_bins = None
            self.energy_embedding = None


    def get_pitch_embedding(self, pred, target, mask, control=1.):
        if target is not None:
            embedding = self.pitch_embedding(torch.bucketize(target, self.pitch_bins))
        else:
            #pred = pred * control
            embedding = self.pitch_embedding(torch.bucketize(pred, self.pitch_bins))
        return embedding

    def get_energy_embedding(self, pred, target, mask, control=1.):
        if target is not None:
            embedding = self.energy_embedding(torch.bucketize(target, self.energy_bins))
        else:
            #pred = pred * control
            embedding = self.energy_embedding(torch.bucketize(pred, self.energy_bins))
        return embedding

    def get_embedding(self, pred, target, mask, control=1.):
        if self.pitch_embedding is not None:
            return self.get_pitch_embedding(pred, target, mask, control)
        elif self.energy_embedding is not None:
            return self.get_energy_embedding(pred, target, mask, control)
        return None

    def forward(self, fused_features):
        y = fused_features.permute(0, 2, 1)
        y = self.conv1(y)
        y = y.permute(0, 2, 1)
        y = nn.ReLU()(self.norm1(y))        
        y = y.permute(0, 2, 1)
        y = self.conv2(y)
        y = y.permute(0, 2, 1)
        features = self.norm2(y)
        y = self.linear(y)
        if self.duration:
            y = nn.ReLU()(y)
            return y, features

        return y


class Fuse(nn.Module):
    """ Fuse Attn Features"""

    def __init__(self, dims, kernel_size=3):
        super().__init__()

        assert(len(dims)>0)

        dim = dims[0]
        self.mlps = nn.ModuleList([])
        for d in dims:
            upsample = d // dim
            self.mlps.append(
                    nn.ModuleList([
                        nn.Linear(d, dim),
                        nn.ConvTranspose1d(dim, dim, kernel_size=kernel_size, stride=upsample) \
                                           if upsample>1 else nn.Identity()
                        ]))

        self.fuse = nn.Linear(dim*len(dims), dim)

    def forward(self, features, mask=None):

        fused_features = []
        
        # each feature from encoder block
        for feature, mlps in zip(features, self.mlps):
            mlp, upsample = mlps
            # linear projection to uniform channel size (eg 256)
            x = mlp(feature)
            # upsample operates on the n or seqlen dim
            x = x.permute(0, 2, 1)
            # upsample sequence len downsampled by encoder blocks
            x = upsample(x)
            
            if mask is not None:
                x = x[:,:,:mask.shape[1]]
            elif len(fused_features) > 0:
                x = x[:,:,:fused_features[0].shape[-1]] 

            fused_features.append(x)
            #print(x.size())

        # cat on the feature dim
        fused_features = torch.cat(fused_features, dim=-2)
        fused_features = fused_features.permute(0, 2, 1)

        fused_features = self.fuse(fused_features)
        if mask is not None:
            fused_features = fused_features.masked_fill(mask, 0)

        return fused_features


class FeatureUpsampler(nn.Module):
    """ Upsample fused features using target or predicted duration"""

    def __init__(self):
        super().__init__()

    def forward(self, fused_features, fused_masks, duration, max_mel_len=None):
        mel_len = list()
        features = list()
        masks = list()

        for feature, mask, repetition in zip(fused_features, fused_masks, duration):
            repetition = repetition.squeeze().int()
            feature = feature.repeat_interleave(repetition, dim=0)
            mask = mask.repeat_interleave(repetition, dim=0)
            mel_len.append(feature.shape[0])
            if max_mel_len is not None:
                feature = F.pad(feature, (0, 0, 0, max_mel_len -
                                feature.shape[0]), "constant", 0.0)
                mask = F.pad(mask, (0, 0, 0,  max_mel_len -
                             mask.shape[0]), "constant", True)
            features.append(feature)
            masks.append(mask)

        if max_mel_len is None:
            max_mel_len = max(mel_len)
            features = [F.pad(feature, (0, 0, 0, max_mel_len - feature.shape[0]),
                              "constant", 0.0) for feature in features]
            masks = [F.pad(mask, (0, 0, 0, max_mel_len - mask.shape[0]),
                           "constant", True) for mask in masks]

        features = torch.stack(features)
        masks = torch.stack(masks)
        len_pred = torch.IntTensor(mel_len).to(features.device)
        #len_pred = torch.LongTensor(mel_len).to(features.device)

        return features, masks, len_pred


class MelDecoder(nn.Module):
    """ Mel Spectrogram Decoder """

    def __init__(self, dim, kernel_size=5, n_mel_channels=80,
                 n_blocks=2, block_depth=2,):
        super().__init__()

        self.n_mel_channels = n_mel_channels
        dim_x2 = min(4*dim, 256)
        dim_x4 = 4*dim
        padding = kernel_size // 2

        self.proj = nn.Sequential(
            nn.Linear(dim_x4, dim_x2), nn.Tanh(), nn.LayerNorm(dim_x2),)

        self.blocks = nn.ModuleList([])
        for _ in range(n_blocks):
            conv = nn.ModuleList([])
            for _ in range(block_depth):
                conv.append(nn.ModuleList([nn.Sequential(\
                        nn.Conv1d(dim_x2, dim_x2, groups=dim_x2, kernel_size=kernel_size, padding=padding),\
                        nn.Conv1d(dim_x2, dim_x2, kernel_size=1), \
                        nn.Tanh(),),
                        nn.LayerNorm(dim_x2)]))

            self.blocks.append(nn.ModuleList([conv, nn.LayerNorm(dim_x2)]))

        self.mel_linear = nn.Linear(dim_x2, self.n_mel_channels)


    def forward(self, features):
        skip = self.proj(features)
        for convs, skip_norm in self.blocks:
            x = skip
            for conv, norm in convs:
                x = conv(x.permute(0, 2, 1))
                x = norm(x.permute(0, 2, 1))

            skip = skip_norm(x + skip)

        # resize channel to mel length (eg 80)
        mel = self.mel_linear(skip)

        return mel


class PhonemeEncoder(nn.Module):
    """ Encodes phonemes to acoustic features """

    def __init__(self,
                 pitch_stats=None, 
                 energy_stats=None, 
                 depth=2, 
                 reduction=4, 
                 head=1, 
                 embed_dim=128, 
                 kernel_size=3, 
                 expansion=1):
        super().__init__()

        self.encoder = Encoder(depth=depth,
                               reduction=reduction, 
                               head=head, 
                               embed_dim=embed_dim, 
                               kernel_size=kernel_size, 
                               expansion=expansion,)
        
        dim = embed_dim // reduction
        self.fuse = Fuse(self.encoder.get_feature_dims(), kernel_size=kernel_size)
        self.feature_upsampler = FeatureUpsampler()
        self.pitch_decoder = AcousticDecoder(dim, pitch_stats=pitch_stats)
        self.energy_decoder = AcousticDecoder(dim, energy_stats=energy_stats)
        self.duration_decoder = AcousticDecoder(dim, duration=True)
        

    def forward(self, x, train=False):
        phoneme = x["phoneme"]
        phoneme_mask = x["phoneme_mask"] if phoneme.shape[0] > 1 else None

        pitch_target = x["pitch"] if train else None
        energy_target = x["energy"] if train  else None
        duration_target = x["duration"] if train  else None
        mel_len = x["mel_len"] if train  else None
        max_mel_len = torch.max(mel_len).item() if train else None

        features, mask = self.encoder(phoneme, mask=phoneme_mask)
        fused_features = self.fuse(features, mask=mask)
        
        pitch_pred = self.pitch_decoder(fused_features)
        pitch_features = self.pitch_decoder.get_embedding(pitch_pred, pitch_target, mask)
        pitch_features = pitch_features.squeeze()
        if mask is not None:
            pitch_features = pitch_features.masked_fill(mask, 0)
        elif pitch_features.dim() != 3:
            pitch_features = pitch_features.unsqueeze(0)

        energy_pred = self.energy_decoder(fused_features)
        energy_features = self.energy_decoder.get_embedding(energy_pred, energy_target, mask)
        energy_features = energy_features.squeeze()

        if mask is not None:
            energy_features = energy_features.masked_fill(mask, 0)
        elif energy_features.dim() != 3:
            energy_features = energy_features.unsqueeze(0)

        duration_pred, duration_features = self.duration_decoder(fused_features)
        if mask is not None:
            duration_features = duration_features.masked_fill(mask, 0)
       
        fused_features = torch.cat([fused_features, pitch_features, \
                                    energy_features, duration_features], dim=-1)

        # TODO: Use fused_masks of all False for inference of bs=1
        if mask is None:
            fused_masks = torch.zeros_like(fused_features).bool()
        else:
            fused_masks = torch.cat([mask, mask, mask, mask], dim=-1)
        
        if duration_target is None:
            duration_target = torch.round(duration_pred).squeeze()
        if phoneme_mask is not None:
            duration_target = duration_target.masked_fill(phoneme_mask, 0).clamp(min=0)
        else:
            duration_target = duration_target.unsqueeze(0)

        features, masks, mel_len_pred = self.feature_upsampler(fused_features,
                                                               fused_masks,
                                                               duration=duration_target,
                                                               max_mel_len=max_mel_len,)
    
        if mask is None:
            masks = None

        y = {"pitch": pitch_pred,
             "energy": energy_pred,
             "duration": duration_pred,
             "mel_len": mel_len_pred,
             "features": features,
             "masks": masks, }

        return y

        
class Phoneme2Mel(nn.Module):
    """ From Phoneme Sequence to Mel Spectrogram """

    def __init__(self,
                 encoder,
                 decoder):
        super().__init__()

        self.encoder = encoder
        self.decoder = decoder

    def forward(self, x, train=False):
        # Dirty trick to enable ONNX compilation.
        # Else, the torch.to_onnx complains about missing input in the forward method.
        if isinstance(x, list):
            x = x[0]
            
        pred = self.encoder(x, train=train)
        mel = self.decoder(pred["features"]) 
        
        mask = pred["masks"]
        if mask is not None and mel.size(0) > 1:
            mask = mask[:, :, :mel.shape[-1]]
            mel = mel.masked_fill(mask, 0)
        
        pred["mel"] = mel

        if train: 
            return pred

        return mel, pred["mel_len"], pred["duration"]

def write_to_file(wavs, preprocess_config, lengths=None, wav_path="outputs", filename="tts"):
    wavs = (
            wavs * preprocess_config["preprocessing"]["audio"]["max_wav_value"]
            ).astype("int16")
    wavs = [wav for wav in wavs]
    sampling_rate = preprocess_config["preprocessing"]["audio"]["sampling_rate"]
    if lengths is not None:
        lengths *= preprocess_config["preprocessing"]["stft"]["hop_length"]
        for i in range(len(wavs)):
            wavs[i] = wavs[i][: lengths[i]]
            
    # create dir if not exists
    os.makedirs(wav_path, exist_ok=True)
    if len(wavs) == 1:
        path = os.path.join(wav_path, filename)
        print("Writing wav to {}".format(path))
        wavfile.write(path, sampling_rate, wavs[0])
    else:
        for i, wav in enumerate(wavs):
            path = os.path.join(wav_path, "{}-{}.wav".format(filename, i+1))
            wavfile.write(path, sampling_rate, wav)
    
    return wavs, sampling_rate

def get_hifigan(checkpoint="models/hifigan/LJ_V2/generator_v2", infer_device=None, verbose=False):
    # get the main path
    #main_path = os.path.dirname(os.path.abspath(checkpoint))
    #json_config = os.path.join(main_path, "config.json")
    checkpoint = "models/hifigan/LJ_V2/generator_v2"
    json_config = "/app/models/hifigan/LJ_V2/config.json"
    #if verbose:
    print("Using config: ", json_config)
    print("Using hifigan checkpoint: ", checkpoint)
    with open(json_config, "r") as f:
        config = json.load(f)

    config = hifigan.AttrDict(config)
    torch.manual_seed(config.seed)
    vocoder = hifigan.Generator(config)
    if infer_device is not None:
        vocoder.to(infer_device)
        ckpt = torch.load(checkpoint, map_location=torch.device(infer_device))
    else:
        ckpt = torch.load(checkpoint)
        #ckpt = torch.load("hifigan/generator_LJSpeech.pth.tar")
    vocoder.load_state_dict(ckpt["generator"])
    vocoder.eval()
    vocoder.remove_weight_norm()
    for p in vocoder.parameters():
        p.requires_grad = False
    
    return vocoder

# bard
def linear_warmup_cosine_annealing_lr(optimizer, num_warmup_steps, num_training_steps, max_lr):
    """
    Implements a learning rate scheduler with linear warm up and then cosine learning rate decay.

    Args:
        optimizer: The optimizer to use.
        num_warmup_steps: The number of steps to use for linear warm up.
        num_training_steps: The total number of training steps.
        max_lr: The maximum learning rate.

    Returns:
        A learning rate scheduler.
    """
    scheduler = CosineAnnealingLR(optimizer, num_training_steps, eta_min=0)

    def lr_lambda(current_step: int):
        if current_step < num_warmup_steps:
            return float(current_step) / float(max(1, num_warmup_steps))
        else:
            return 0.5 * (1.0 + math.cos(math.pi * (current_step - num_warmup_steps) / float(num_training_steps - num_warmup_steps)))

    scheduler.set_lambda(lr_lambda)

    return scheduler

# chatgpt
def get_lr_scheduler(optimizer, warmup_steps, total_steps, min_lr=0):
    """
    Create a learning rate scheduler with linear warm-up and cosine learning rate decay.

    Args:
        optimizer (torch.optim.Optimizer): The optimizer for which to create the scheduler.
        warmup_steps (int): The number of warm-up steps.
        total_steps (int): The total number of steps.
        min_lr (float, optional): The minimum learning rate at the end of the decay. Default: 0.

    Returns:
        torch.optim.lr_scheduler.LambdaLR: The learning rate scheduler.
    """

    def lr_lambda(current_step):
        if current_step < warmup_steps:
            # Linear warm-up
            return float(current_step) / float(max(1, warmup_steps))
        else:
            # Cosine learning rate decay
            progress = float(current_step - warmup_steps) / float(max(1, total_steps - warmup_steps))
            return max(min_lr, 0.5 * (1.0 + math.cos(math.pi * progress)))

    scheduler = LambdaLR(optimizer, lr_lambda)
    return scheduler


class EfficientSpeech(LightningModule):
    def __init__(self,
                 preprocess_config, 
                 lr=1e-3,
                 weight_decay=1e-6, 
                 max_epochs=5000,
                 depth=2, 
                 n_blocks=2, 
                 block_depth=2, 
                 reduction=4, 
                 head=1,
                 embed_dim=128, 
                 kernel_size=3, 
                 decoder_kernel_size=3, 
                 expansion=1,
                 wav_path="wavs", 
                 hifigan_checkpoint="hifigan/LJ_V2/generator_v2",
                 infer_device=None, 
                 verbose=False):
        super(EfficientSpeech, self).__init__()
        preprocess_config = {'dataset': 'TTS', 'path': {'lexicon_path': 'lexicon/librispeech-lexicon.txt', 'preprocessed_path': './models'}, 'preprocessing': {'audio': {'max_wav_value': 32768.0, 'sampling_rate': 22050}, 'energy': {'feature': 'phoneme_level', 'normalization': True}, 'mel': {'mel_fmax': 8000, 'mel_fmin': 0, 'n_mel_channels': 80}, 'pitch': {'feature': 'phoneme_level', 'normalization': True}, 'stft': {'filter_length': 1024, 'hop_length': 256, 'win_length': 1024}, 'text': {'language': 'en', 'max_length': 4096, 'text_cleaners': ['english_cleaners']}, 'val_size': 512}}
        self.save_hyperparameters()

#        preprocess_config = bababooey
        with open(os.path.join(preprocess_config["path"]["preprocessed_path"], "stats.json")) as f:
            stats = json.load(f)
            pitch_stats = stats["pitch"][:2]
            energy_stats = stats["energy"][:2]

        phoneme_encoder = PhonemeEncoder(pitch_stats=pitch_stats,
                                         energy_stats=energy_stats,
                                         depth=depth,
                                         reduction=reduction,
                                         head=head,
                                         embed_dim=embed_dim,
                                         kernel_size=kernel_size,
                                         expansion=expansion)

        mel_decoder = MelDecoder(dim=embed_dim//reduction, 
                                 kernel_size=decoder_kernel_size,
                                 n_blocks=n_blocks, 
                                 block_depth=block_depth)

        self.phoneme2mel = Phoneme2Mel(encoder=phoneme_encoder,
                                       decoder=mel_decoder)

        self.hifigan = get_hifigan(checkpoint=hifigan_checkpoint,
                                   infer_device=infer_device, verbose=verbose)

        self.training_step_outputs = []


    def forward(self, x):
        return self.phoneme2mel(x, train=True) if self.training else self.predict_step(x)


    def predict_step(self, batch, batch_idx=0,  dataloader_idx=0):
        mel, mel_len, duration = self.phoneme2mel(batch, train=False)
        mel = mel.transpose(1, 2)
        wav = self.hifigan(mel).squeeze(1)
        
        return wav, mel_len, duration


    def loss(self, y_hat, y, x):
        pitch_pred = y_hat["pitch"]
        energy_pred = y_hat["energy"]
        duration_pred = y_hat["duration"]
        mel_pred = y_hat["mel"]

        phoneme_mask = x["phoneme_mask"]
        mel_mask = x["mel_mask"]

        pitch = x["pitch"]
        energy = x["energy"]
        duration = x["duration"]
        mel = y["mel"]

        mel_mask = ~mel_mask
        mel_mask = mel_mask.unsqueeze(-1)
        target = mel.masked_select(mel_mask)
        pred = mel_pred.masked_select(mel_mask)
        mel_loss = nn.L1Loss()(pred, target)
    
        phoneme_mask = ~phoneme_mask

        pitch_pred = pitch_pred[:,:pitch.shape[-1]]
        pitch_pred = torch.squeeze(pitch_pred)
        pitch = pitch.masked_select(phoneme_mask)
        pitch_pred = pitch_pred.masked_select(phoneme_mask)
        pitch_loss = nn.MSELoss()(pitch_pred, pitch)

        energy_pred = energy_pred[:,:energy.shape[-1]]
        energy_pred = torch.squeeze(energy_pred)
        energy      = energy.masked_select(phoneme_mask)
        energy_pred = energy_pred.masked_select(phoneme_mask)
        energy_loss = nn.MSELoss()(energy_pred, energy)

        duration_pred = duration_pred[:,:duration.shape[-1]]
        duration_pred = torch.squeeze(duration_pred)
        duration      = duration.masked_select(phoneme_mask)
        duration_pred = duration_pred.masked_select(phoneme_mask)
        duration      = torch.log(duration.float() + 1)
        duration_pred = torch.log(duration_pred.float() + 1)
        duration_loss = nn.MSELoss()(duration_pred, duration)

        return mel_loss, pitch_loss, energy_loss, duration_loss
 

    def training_step(self, batch, batch_idx):
        x, y = batch
        y_hat = self.forward(x)

        mel_loss, pitch_loss, energy_loss, duration_loss = self.loss(y_hat, y, x)
        loss = (10. * mel_loss) + (2. * pitch_loss) + (2. * energy_loss) + duration_loss
        
        losses = {"loss": loss, 
                  "mel_loss": mel_loss, 
                  "pitch_loss": pitch_loss,
                  "energy_loss": energy_loss, 
                  "duration_loss": duration_loss}
        self.training_step_outputs.append(losses)
        
        return loss


    def on_train_epoch_end(self):
        avg_loss = torch.stack([x["loss"] for x in self.training_step_outputs]).mean()
        avg_mel_loss = torch.stack([x["mel_loss"] for x in self.training_step_outputs]).mean()
        avg_pitch_loss = torch.stack([x["pitch_loss"] for x in self.training_step_outputs]).mean()
        avg_energy_loss = torch.stack(
            [x["energy_loss"] for x in self.training_step_outputs]).mean()
        avg_duration_loss = torch.stack(
            [x["duration_loss"] for x in self.training_step_outputs]).mean()
        self.log("mel", avg_mel_loss, on_epoch=True, prog_bar=True, sync_dist=True)
        self.log("pitch", avg_pitch_loss, on_epoch=True, prog_bar=True, sync_dist=True)
        self.log("energy", avg_energy_loss, on_epoch=True, prog_bar=True, sync_dist=True)
        self.log("dur", avg_duration_loss, on_epoch=True, prog_bar=True, sync_dist=True)
        self.log("loss", avg_loss, on_epoch=True, prog_bar=True, sync_dist=True)
        self.log("lr", self.scheduler.get_last_lr()[0], on_epoch=True, prog_bar=True, sync_dist=True)
        self.training_step_outputs.clear()


    def validation_step(self, batch, batch_idx):
        # TODO: use predict step for wav file generation

        if batch_idx==0 and self.current_epoch>=1 :
            x, y = batch
            wavs, lengths, _ = self.forward(x)
            wavs = wavs.to(torch.float).cpu().numpy()
            write_to_file(wavs, self.hparams.preprocess_config, lengths=lengths.cpu().numpy(), \
                wav_path=self.hparams.wav_path, filename="prediction")

            mel = y["mel"]
            mel = mel.transpose(1, 2)
            lengths = x["mel_len"]
            with torch.no_grad():
                wavs = self.hifigan(mel).squeeze(1)
                wavs = wavs.to(torch.float).cpu().numpy()
            
            write_to_file(wavs, self.hparams.preprocess_config, lengths=lengths.cpu().numpy(),\
                    wav_path=self.hparams.wav_path, filename="reconstruction")

            # write the text to be converted to file
            path = os.path.join(self.hparams.wav_path, "prediction.txt")
            with open(path, "w") as f:
                text = x["text"] 
                for i in range(len(text)):
                    f.write(text[i] + "\n")
            
    def on_test_epoch_end(self):
        pass

    def on_validation_epoch_end(self):
        pass

    def configure_optimizers(self):
        optimizer = AdamW(self.parameters(), lr=self.hparams.lr, weight_decay=self.hparams.weight_decay)
        self.scheduler = get_lr_scheduler(optimizer, 50, self.hparams.max_epochs, min_lr=0)
    
        return [optimizer], [self.scheduler]
    
def tts(lexicon, g2p, preprocess_config, model, text, filename, verbose=False):
    text = text.strip()
    text = text.replace('-', ' ')
    phoneme = np.array(
            [text2phoneme(lexicon, g2p, text, preprocess_config, verbose=False)], dtype=np.int32)
    start_time = time.time()

    with torch.no_grad():
        phoneme = torch.from_numpy(phoneme).int().to("cuda")
        wavs, lengths, _ = model({"phoneme": phoneme})
        wavs = wavs.cpu().numpy()
        lengths = lengths.cpu().numpy()
        
    elapsed_time = time.time() - start_time
    wav = np.reshape(wavs, (-1, 1))

    message = f"Synthesis time: {elapsed_time:.2f} sec"
    sampling_rate = preprocess_config["preprocessing"]["audio"]["sampling_rate"]
    wav_len = wav.shape[0] / sampling_rate
    message += f"\nVoice length: {wav_len:.2f} sec"
    real_time_factor = wav_len / elapsed_time
    message += f"\nReal time factor: {real_time_factor:.2f}"
    message += f"\nNote:\tFor benchmarking, load the model 1st, do a warmup run for 100x, then run the benchmark for 1000 iterations."
    message += f"\n\tGet the mean of 1000 runs. Use --iter N to run N iterations. eg N=100"
    write_to_file(wavs, preprocess_config, lengths=lengths, \
            wav_path="./", filename=filename)
    
    print(message)
    return wav, message, phoneme, wav_len, real_time_factor