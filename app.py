import os
import sqlite3
import hashlib
from flask import Flask, request

app = Flask(__name__)

# ✅ CORRECTION 1 : Plus aucun secret en dur (Gitleaks est content)
# On demande à Python d'aller chercher le mot de passe dans les variables d'environnement du serveur.
# S'il ne le trouve pas (ex: sur ton PC), il utilise une valeur par défaut inoffensive.
DB_PASSWORD = os.environ.get("DB_PASSWORD", "valeur_par_defaut_locale")

@app.route('/profile')
def profile():
    username = request.args.get('username', 'invite')

    # ✅ CORRECTION 2 : Requête paramétrée (Semgrep est content)
    # Au lieu d'injecter directement la variable, on utilise un "?" (ou un tuple).
    # La base de données comprend que c'est du texte pur et refusera d'exécuter du code SQL malveillant.
    conn = sqlite3.connect('database.db')
    cursor = conn.cursor()
    query = "SELECT * FROM users WHERE name = ?"
    cursor.execute(query, (username,))
    
    return f"Recherche sécurisée effectuée pour {username}"

@app.route('/hash')
def hash_data():
    data = request.args.get('data', 'test')
    
    # ✅ CORRECTION 3 : Cryptographie robuste (Semgrep est content)
    # Fini le vieux MD5. On utilise le standard actuel : SHA-256.
    strong_hash = hashlib.sha256(data.encode()).hexdigest()
    
    return strong_hash

if __name__ == '__main__':
    # ✅ CORRECTION 4 : Le mode Debug est DÉSACTIVÉ !
    port = int(os.environ.get("PORT", 5000))
    app.run(host='0.0.0.0', port=port, debug=False)