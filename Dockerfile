# --- ÉTAPE 1 : BUILD (L'atelier de construction) ---
# On utilise une image "slim" pour installer les dépendances proprement
FROM node:20-slim AS builder

WORKDIR /app

# On ne copie que les fichiers de dépendances pour profiter du cache Docker
COPY package*.json ./
RUN npm install --only=production

# On copie le reste du code
COPY . .

# --- ÉTAPE 2 : PRODUCTION (La Forteresse) ---
# On repart d'une image "Alpine" : ultra-légère (5MB) et très sécurisée
FROM node:20-alpine

# 1. Sécurité Système : On crée un utilisateur NON-PRIVILÉGIÉ
# Par défaut Docker est root, ici on crée "appuser" qui n'a aucun droit sur le système Linux
RUN addgroup -S appgroup && adduser -S appuser -G appgroup

WORKDIR /app

# 2. Hygiène : On ne récupère que ce qui est nécessaire du builder
# On laisse derrière nous tous les outils de build, compilateurs, etc.
COPY --from=builder /app .

# 3. Droits restreints : On donne la propriété des fichiers à notre utilisateur
RUN chown -R appuser:appgroup /app

# 4. Protection : On bascule sur l'utilisateur limité
USER appuser

# 5. Réseau : Un seul port ouvert (celui de l'app), pas de SSH (22) !
EXPOSE 3000

# 6. Santé : On indique à Docker comment vérifier si l'app tourne bien
HEALTHCHECK --interval=30s --timeout=3s \
  CMD wget --quiet --tries=1 --spider http://localhost:3000/ || exit 1

CMD ["node", "app.js"]