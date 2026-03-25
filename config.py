import os

# Le code va chercher les cles dans la memoire cachee du serveur, 
# elles ne sont plus ecrites dans le texte !

AWS_ACCESS_KEY_ID = os.getenv("AWS_ACCESS_KEY_ID")
AWS_SECRET_ACCESS_KEY = os.getenv("AWS_SECRET_ACCESS_KEY")