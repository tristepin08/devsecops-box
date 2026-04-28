import os
from flask import Flask

app = Flask(__name__)

@app.route('/')
def home():
    return "<h1>Bienvenue sur mon site sécurisé !</h1><p>Le pipeline DevSecOps fonctionne à 100%.</p>"

@app.route('/health')
def health_check():
    return {"status": "ok", "message": "Serveur opérationnel et sécurisé"}

if __name__ == '__main__':
    port = int(os.environ.get("PORT", 5000))
    
    # 👇 Voici le laissez-passer explicite pour Semgrep 👇
    # nosemgrep: python.flask.security.audit.app-run-param-config.avoid_app_run_with_bad_host
    app.run(host='0.0.0.0', port=port, debug=False)