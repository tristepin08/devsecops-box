from flask import Flask

app = Flask(__name__)

@app.route('/')
def home():
    return "<h1>Projet DevSecOps Complet - Deploy Automatique OK ! ✅🥇</h1>"