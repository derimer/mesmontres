# ===========================
# Étape 1 : Image de base
# ===========================
FROM node:20-alpine3.20

# Empêcher les erreurs de permissions PNPM
RUN npm install -g pnpm@9 && pnpm config -g set store-dir /.pnpm-store

# Crée un dossier de travail
WORKDIR /usr/src/app

# ===========================
# Étape 2 : Installation des dépendances
# ===========================

# Copie des fichiers de dépendances
COPY package*.json ./

# Installation des dépendances via PNPM
RUN pnpm install --no-frozen-lockfile


# ===========================
# Étape 3 : Copie du code source
# ===========================
COPY . .

# ===========================
# Étape 4 : Variables d’environnement
# ===========================
ENV NODE_ENV=production
ENV PORT=3310

# ===========================
# Étape 5 : Exposition du port
# ===========================
EXPOSE 3310

# ===========================
# Étape 6 : Démarrage de l’application
# ===========================
CMD ["pnpm", "start"]
