from flask import Flask
from flask_restful import Api, Resource, reqparse
from transformers import pipeline
import base64
from model import EfficientSpeech, tts
import pytesseract
import yaml
from PIL import Image
import os
import torch
from synthesize import get_lexicon_and_g2p
import string
from pydub import AudioSegment

app = Flask(__name__)
api = Api(app)

toxicPipe = pipeline("text-classification", model="facebook/roberta-hate-speech-dynabench-r4-target")
cardPipe = pipeline("text-generation", model="stabilityai/StableBeluga-7B")
STTPipe = pipeline("automatic-speech-recognition", model="mesolitica/finetune-whisper-base-ms-singlish-v2")
pytesseract.pytesseract.tesseract_cmd = 'models/tesseract/tesseract.exe'
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


class Toxic(Resource):

    @staticmethod
    def post():
        parser = reqparse.RequestParser()
        parser.add_argument('text', required=True, type=str)

        args = parser.parse_args()  # creates dict

        out = {'Prediction': toxicPipe(args['text'])[0]['label']}

        return out, 200

class Card(Resource):

    @staticmethod
    def post():
        parser = reqparse.RequestParser()
        parser.add_argument('text', required=True, type=str)

        args = parser.parse_args()  # creates dict

        prompt = f"Convert this text into concise q and a card with the format of\nQ:text\nA:text.\n {args['text']}"

        out = {'Prediction': cardPipe(prompt, return_full_text=False, max_new_tokens=600)[0]['generated_text']}

        return out, 200

class OCR(Resource):

    @staticmethod
    def post():
        parser = reqparse.RequestParser()
        parser.add_argument('image', required=True, type=str) # base64 encoded image

        args = parser.parse_args()  # creates dict

        image = base64.b64decode(args['image'])
        img_file = open('image.jpeg', 'wb')
        img_file.write(image)
        img_file.close()

        out = {'Prediction': pytesseract.image_to_string('image.jpeg')}
        os.remove("image.jpeg") 
        return out, 200
    
class TTS(Resource):

    @staticmethod
    def post():
        parser = reqparse.RequestParser()
        parser.add_argument('text', required=True, type=str) # base64 encoded image

        args = parser.parse_args()  # creates dict

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

        return out, 200

class STT(Resource):

    @staticmethod
    def post():
        parser = reqparse.RequestParser()
        parser.add_argument('speech', required=True, type=str) # base64 encoded wav file

        args = parser.parse_args()  # creates dict

        speech = base64.decodebytes(args['speech'])

        out = {'Prediction': STTPipe(speech)[0]['text']}

        return out, 200


api.add_resource(Toxic, '/toxic')
api.add_resource(Card, '/card')
api.add_resource(OCR, '/ocr')
api.add_resource(STT, '/stt')
api.add_resource(TTS, '/tts')

if __name__ == '__main__':
    app.run(debug=True, port='1080')