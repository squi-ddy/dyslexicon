from flask import Flask, request, Response, jsonify
from flask_cors import CORS
from aeneas.executetask import ExecuteTask
from aeneas.task import Task
import base64
import os
import pathlib
import json
import string
import random

app = Flask(__name__)
CORS(app)


@app.route("/alignalive")
def is_alive():
    status_code = Response(status=200)
    return status_code

@app.route("/align", methods=["POST"])
def predict():
    rand_text = ''.join(random.SystemRandom().choice(string.ascii_uppercase + string.ascii_lowercase) for _ in range(10))
    args = request.get_json()["instances"][0]
    speech = base64.b64decode(args['speech'])
    wav_file = open(f"temp-{rand_text}.wav", "wb")
    wav_file.write(speech)
    wav_file.close()
    text = args['text']
    with open(f"text-{rand_text}.txt", "w") as text_file:
        for i in text.split():
            text_file.write(i + "\n")
     
    config_string = u"task_language=eng|is_text_type=plain|os_task_file_format=json"
    task = Task(config_string=config_string)
    task.audio_file_path_absolute = os.getcwd() + f"/temp-{rand_text}.wav"
    task.text_file_path_absolute = os.getcwd() + f"/text-{rand_text}.txt"
    task.sync_map_file_path_absolute = os.getcwd() + "/{}.json".format(rand_text)
    ExecuteTask(task).execute()
    task.output_sync_map_file()
    os.remove(f"temp-{rand_text}.wav")
    os.remove(f"text-{rand_text}.txt")
    f = open("{}.json".format(rand_text))
    data = json.load(f)
    os.remove("{}.json".format(rand_text))
    return jsonify({"predictions":data})

if __name__ == "__main__":
    app.run(debug=True, host="0.0.0.0", port=8080)