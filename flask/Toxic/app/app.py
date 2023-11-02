from flask import Flask, request, Response, jsonify
from flask_cors import CORS
from detoxify import Detoxify

app = Flask(__name__)
CORS(app)

model = Detoxify('unbiased')

@app.route("/toxicalive")
def is_alive():
    status_code = Response(status=200)
    return status_code

@app.route("/toxic", methods=["POST"])
def predict():
    args = request.get_json()["instances"][0]
    pred = Detoxify.predict([args['text']])

    output = 'Not-Toxic'
    for _, value in pred.items():
        if (value >= 0.5):
            output = 'Toxic'
            break    

    out = {'predictions': output}

    return jsonify(out)

if __name__ == "__main__":
    app.run(debug=True, host="0.0.0.0", port=8080)