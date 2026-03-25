from flask import Flask

app = Flask(__name__)

@app.route('/')
def home():
    return "<h1>Bienvenue dans mon conteneur ultra-securise ! 🐳🛡️</h1>"