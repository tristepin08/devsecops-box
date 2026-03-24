import sqlite3
from flask import Flask, request

app = Flask(__name__)

# On crée une vraie page web accessible sur Internet
@app.route('/recherche')
def recherche_utilisateur():
    # 1. LA SOURCE : On récupère ce que le visiteur tape dans l'URL
    nom_utilisateur = request.args.get('nom') 
    
    connexion = sqlite3.connect('base.db')
    curseur = connexion.cursor()
    
    # 2. LE GOUFFRE : On injecte le texte du visiteur directement dans le SQL
    requete = "SELECT * FROM users WHERE nom = '" + nom_utilisateur + "'"
    curseur.execute(requete)
    
    return "Recherche terminée"