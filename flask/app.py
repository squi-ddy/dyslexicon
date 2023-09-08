from flask import Flask
from flask_restful import Api, Resource, reqparse
from transformers import pipeline
import base64
from doctr.io import DocumentFile
from doctr.models import ocr_predictor

app = Flask(__name__)
api = Api(app)

toxicPipe = pipeline("text-classification", model="facebook/roberta-hate-speech-dynabench-r4-target")
cardPipe = pipeline("text-generation", model="stabilityai/StableBeluga-7B")
STTPipe = pipeline("automatic-speech-recognition", model="mesolitica/finetune-whisper-base-ms-singlish-v2")



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

class OCRImage(Resource):

    @staticmethod
    def post():
        parser = reqparse.RequestParser()
        parser.add_argument('image', required=True, type=str) # base64 encoded image

        args = parser.parse_args()  # creates dict

        image = base64.b64decode(args['image'])
        img_file = open('image.jpeg', 'wb')
        img_file.write(image)
        img_file.close()



        out = {'Prediction': cardPipe(prompt, return_full_text=False, max_new_tokens=600)[0]['generated_text']}

        return out, 200
    
class OCRPdf(Resource):

    @staticmethod
    def post():
        parser = reqparse.RequestParser()
        parser.add_argument('pdf', required=True, type=str) # base64 encoded image

        args = parser.parse_args()  # creates dict

        image = base64.b64decode(args['image'])

        out = {'Prediction': cardPipe(prompt, return_full_text=False, max_new_tokens=600)[0]['generated_text']}

        return out, 200
    
class TTS(Resource):

    @staticmethod
    def post():
        parser = reqparse.RequestParser()
        parser.add_argument('text', required=True, type=str) # base64 encoded image

        args = parser.parse_args()  # creates dict

        out = {'Prediction': cardPipe(prompt, return_full_text=False, max_new_tokens=600)[0]['generated_text']}

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
api.add_resource(OCRImage, '/ocri')
api.add_resource(OCRPdf, '/ocrp')
api.add_resource(STT, '/stt')
api.add_resource(TTS, '/tts')

if __name__ == '__main__':
    app.run(debug=True, port='1080')