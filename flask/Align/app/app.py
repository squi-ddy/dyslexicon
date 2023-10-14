from flask import Flask, request, Response, jsonify
from flask_cors import CORS
from aeneas.executetask import ExecuteTask
from aeneas.task import Task
import base64
import os
import pathlib
import json

app = Flask(__name__)
CORS(app)


@app.route("/alignalive")
def is_alive():
    status_code = Response(status=200)
    return status_code

@app.route("/align", methods=["POST"])
def predict():
    args = request.get_json()["instances"][0]
    speech = base64.b64decode(args['speech'])
    wav_file = open("temp.wav", "wb")
    wav_file.write(speech)
    wav_file.close()
    text = args['text']
    with open("text.txt", "w") as text_file:
        for i in text.split():
            text_file.write(f"{i}\n")
     
    config_string = u"task_language=eng|is_text_type=plain|os_task_file_format=json"
    task = Task(config_string=config_string)
    task.audio_file_path_absolute = pathlib.Path(__file__).parent.resolve() + u"/temp.wav"
    task.text_file_path_absolute = pathlib.Path(__file__).parent.resolve() + u"/text.txt"
    task.sync_map_file_path_absolute = pathlib.Path(__file__).parent.resolve() + u"/syncmap.json"
    ExecuteTask(task).execute()
    task.output_sync_map_file()
    os.remove("temp.wav")
    os.remove("text.txt")
    f = open('syncmap.json')
    data = json.load(f)
    os.remove("syncmap.json")
    return data

if __name__ == "__main__":
    app.run(debug=True, host="0.0.0.0", port=8080)