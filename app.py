import os
import sqlite3
import hashlib
from flask import Flask, request

app = Flask(__name__)

# 🚨 FAILLE 1 : Secret en dur (Pour tester Gitleaks)
AWS_SECRET_KEY = "AKIAIOSFODNN7EXAMPLE"
DB_PASSWORD = "SuperSecretPassword123!"

@app.route('/profile')
def profile():
    # L'utilisateur envoie son nom dans l'URL
    username = request.args.get('username')

    # 🚨 FAILLE 2 : Injection SQL (Pour tester Semgrep)
    # Danger absolu : On concatène directement le texte de l'utilisateur dans la requête !
    conn = sqlite3.connect('database.db')
    cursor = conn.cursor()
    query = f"SELECT * FROM users WHERE name = '{username}'"
    cursor.execute(query)
    
    return "Recherche effectuée"

@app.route('/ping')
def ping_server():
    # L'utilisateur envoie une adresse IP
    ip = request.args.get('ip')
    
    # 🚨 FAILLE 3 : Injection de commandes système (Pour tester Semgrep)
    # Un pirate pourrait envoyer "127.0.0.1; rm -rf /" pour effacer le serveur !
    os.system(f"ping -c 1 {ip}")
    
    return "Ping lancé"

@app.route('/hash')
def hash_data():
    data = request.args.get('data')
    
    # 🚨 FAILLE 4 : Algorithme de cryptographie obsolète (Pour tester Semgrep)
    # MD5 est craquable en quelques secondes aujourd'hui.
    weak_hash = hashlib.md5(data.encode()).hexdigest()
    
    return weak_hash

if __name__ == '__main__':
    # 🚨 FAILLE 5 : Mode Debug activé (Très dangereux en production)
    app.run(host='0.0.0.0', port=5000, debug=True)