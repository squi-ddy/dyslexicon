from flask import Flask, request, Response, jsonify
from flask_cors import CORS
import pyfoal
import base64
import os

app = Flask(__name__)
CORS(app)


@app.route("/alignalive")
def is_alive():
    status_code = Response(status=200)
    return status_code

@app.route("/align", methods=["POST"])
def predict():
    args = request.get_json()
    speech = base64.b64decode(args['speech'])
    wav_file = open("temp.wav", "wb")
    wav_file.write(speech)
    wav_file.close()
    audio = pyfoal.load.audio("temp.wav")
    aligner = 'radtts'
    checkpoint = pyfoal.DEFAULT_CHECKPOINT
    gpu = 0
    text = args['text']

    alignment = pyfoal.from_text_and_audio(
        text,
        audio,
        pyfoal.SAMPLE_RATE,
        aligner=aligner,
        checkpoint=checkpoint,
        gpu=gpu)
    
    os.remove("temp.wav") 

    return alignment.json()

if __name__ == "__main__":
    app.run(debug=True, host="0.0.0.0", port=8080)