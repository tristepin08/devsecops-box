from flask import Flask

app = Flask(__name__)

@app.route('/')
def home():
    return "<h1>🚀 MISSION ACCOMPLIE ! Déploiement 100% Automatique .   ! 🛡️✅</h1>"