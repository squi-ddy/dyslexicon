from flask import Flask, request, Response, jsonify
from flask_cors import CORS
from transformers import pipeline


app = Flask(__name__)
CORS(app)

toxicPipe = pipeline("text-classification", model="facebook/roberta-hate-speech-dynabench-r4-target")

@app.route("/toxicalive")
def is_alive():
    status_code = Response(status=200)
    return status_code

@app.route("/toxic", methods=["POST"])
def predict():
    args = request.get_json()["instances"][0]

    out = {'predictions': toxicPipe(args['text'])[0]['label']}

    return jsonify(out)

if __name__ == "__main__":
    app.run(debug=True, host="0.0.0.0", port=8080)