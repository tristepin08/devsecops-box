import os
from flask import Flask

app = Flask(__name__)

@app.route('/')
def home():
    return "<h1>Bienvenue sur mon site sécurisé !</h1><p>Le pipeline DevSecOps fonctionne à 100%.</p>"

@app.route('/health')
def health_check():
    # Une route "health" est un standard en entreprise pour vérifier que le serveur va bien
    return {"status": "ok", "message": "Serveur opérationnel et sécurisé"}

if __name__ == '__main__':
    # On écoute le port imposé par Render, sinon on utilise le 5000 sur ton PC
    port = int(os.environ.get("PORT", 5000))
    
    # Règle d'or de sécurité : debug=False en production !
    app.run(host='0.0.0.0', port=port, debug=False)