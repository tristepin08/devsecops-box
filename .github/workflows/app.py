import sqlite3
from flask import Flask, request

app = Flask(__name__)

@app.route('/recherche')
def recherche_utilisateur():
    nom_utilisateur = request.args.get('nom') 
    
    connexion = sqlite3.connect('base.db')
    curseur = connexion.cursor()
    
    # 🛡️ LA CORRECTION EST ICI :
    # 1. On utilise un "?" comme espace réservé
    requete = "SELECT * FROM users WHERE nom = ?"
    
    # 2. On donne la variable à part, entre parenthèses
    curseur.execute(requete, (nom_utilisateur,))
    
    return "Recherche terminée"