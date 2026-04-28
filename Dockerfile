# 🚨 ERREUR 1 : Utilisation d'une image de base ultra-vieille et lourde
# Cette image (Ubuntu 18.04) contient des centaines de failles (CVE) connues.
FROM ubuntu:18.04

# 🚨 ERREUR 2 : On reste en utilisateur ROOT (par défaut)
# Si un pirate prend le contrôle de l'app, il a les pleins pouvoirs sur le container.

# 🚨 ERREUR 3 : Stockage de secrets dans les variables d'environnement
ENV DATABASE_PASSWORD="mot_de_passe_tres_secret_123"

# On installe des outils inutiles qui augmentent la surface d'attaque
RUN apt-get update && apt-get install -y curl vim

WORKDIR /app
COPY . .

# 🚨 ERREUR 4 : On expose un port dangereux (SSH) qui n'a rien à faire ici
EXPOSE 22
EXPOSE 3000

CMD ["node", "app.js"]