import sqlite3

def trouver_utilisateur(nom_utilisateur):
    connexion = sqlite3.connect('ma_base_de_donnees.db')
    curseur = connexion.cursor()
    
    # 🚨 ATTENTION : VOICI LA FAMEUSE INJECTION SQL !
    # On colle directement le texte de l'utilisateur dans la requête
    requete = "SELECT * FROM utilisateurs WHERE nom = '" + nom_utilisateur + "'"
    
    curseur.execute(requete)
    return curseur.fetchall()