import os
from flask import Flask
import soundcloud
import json
CLIENT_ID = '707228f02dd69922dbac5f0bb309a07c'
client = soundcloud.Client(client_id=CLIENT_ID)
app = Flask(__name__)

@app.route('/api/<query>')
def hello(query):
    tracks = client.get('/tracks', q=query, filter='downloadable')
    js = {}
    for t in tracks:
        try:
            js[t.title] = "{}?client_id={}".format(t.download_url, CLIENT_ID)
    return json.dumps(js)
