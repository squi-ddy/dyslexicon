from flask import Flask, request, Response, jsonify
from flask_cors import CORS
import base64
from model import EfficientSpeech, tts
import yaml
import os
import torch
from synthesize import get_lexicon_and_g2p
import string
from pydub import AudioSegment

app = Flask(__name__)
CORS(app)

preprocess_config = yaml.load(
        open("models/preprocess.yaml", "r"), Loader=yaml.FullLoader)
lexicon, g2p = get_lexicon_and_g2p(preprocess_config)
sampling_rate = preprocess_config["preprocessing"]["audio"]["sampling_rate"]
model = EfficientSpeech(preprocess_config=preprocess_config, 
                                infer_device='cuda',
                                hifigan_checkpoint="models/hifigan/LJ_V2/generator_v2")
model = model.load_from_checkpoint("models/epoch=1499-step=66000.ckpt",
                                           infer_device="cuda",
                                           map_location=torch.device('cpu'))
model = model.to('cuda')
model.eval()
model = torch.compile(model, mode="reduce-overhead", backend="inductor")

@app.route("/ttsalive")
def is_alive():
    status_code = Response(status=200)
    return status_code

@app.route("/tts", methods=["POST"])

def predict():

    args = request.get_json()

    if (len(args['text']) > 4096):
        wavs = []
        start = 0
        end = 4096

        while (end < len(args['text'])):
            end = string.rfind('.', start, end)
            wavs.append(tts(lexicon, g2p, preprocess_config, model, args["text"][start:end], "sound_{start}.wav"))
            start = end 
            end += 4096

        wav = AudioSegment.from_wav(filename[0])
        os.remove(filename[0])
        for filename in wavs[1:-1]: 
            audio = AudioSegment.from_wav(filename)
            silence = AudioSegment.silent(duration=100)

            wav += silence + audio
            
            os.remove(filename) 
        wav += AudioSegment.from_wav(filename[-1])
        os.remove(filename[-1])
        wav.export("sound.wav", format="wav")
        
    else:
        torch.cuda.synchronize()
        wav, _, _, _, rtf_i = tts(lexicon, g2p, preprocess_config, model, args["text"], "sound.wav")
        torch.cuda.synchronize()

    out = {'Prediction': base64.b64encode(wav).decode('utf-8')}

    os.remove("sound.wav") 

    return jsonify(out)

if __name__ == "__main__":
    app.run(debug=True, host="0.0.0.0", port=8080)