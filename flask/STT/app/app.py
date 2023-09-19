from flask import Flask, request, Response, jsonify
from flask_cors import CORS
from transformers import pipeline
import base64

app = Flask(__name__)
CORS(app)

STTPipe = pipeline("automatic-speech-recognition", model="mesolitica/finetune-whisper-base-ms-singlish-v2")

@app.route("/sttalive")
def is_alive():
    status_code = Response(status=200)
    return status_code

@app.route("/stt", methods=["POST"])
def predict():
    args = request.get_json()["instances"]

    speech = base64.b64decode(args['speech'])

    out = {'Prediction': STTPipe(speech)['text']}

    return jsonify(out)

if __name__ == "__main__":
    app.run(debug=True, host="0.0.0.0", port=8080)