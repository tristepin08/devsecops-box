# --- ÉTAPE 1 : BUILD ---
FROM node:20-slim AS builder
WORKDIR /app

# ✅ On copie d'abord les fichiers de configuration
COPY package*.json ./
# ✅ Maintenant on peut installer
RUN npm install --only=production

#  Ensuite on copie le reste du code
COPY . .

# --- ÉTAPE 2 : PRODUCTION ---
# Utilise node:22-alpine comme sur ta capture si tu veux, 
# mais attention aux failles détectées par Trivy !
FROM node:22-alpine 

RUN addgroup -S appgroup && adduser -S appuser -G appgroup
WORKDIR /app

COPY --from=builder /app .
RUN chown -R appuser:appgroup /app

USER appuser
EXPOSE 3000

# Le HEALTHCHECK est une excellente idée (vue sur ton image)
HEALTHCHECK --interval=30s --timeout=3s \
  CMD wget --quiet --tries=1 --spider http://localhost:3000/health || exit 1

CMD ["node", "app.js"]