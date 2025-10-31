# Multi-stage build pour optimiser la taille de l'image
FROM node:22-alpine AS build


# Définir le répertoire de travail
WORKDIR /app

# Copier les fichiers de configuration du package
COPY package*.json ./

# Installer les dépendances plus rapidement
RUN npm install --legacy-peer-deps \
    && npm audit fix --force \
    && npm update

# Copier le code source
COPY . .

# Arguments de build
ARG VITE_API_URL
ENV VITE_API_URL=$VITE_API_URL

# Build de l'application
RUN npm run build

FROM nginx:alpine

# Mettre à jour les paquets pour corriger les vulnérabilités
RUN apk update && apk upgrade --no-cache

# Copier les fichiers buildés
COPY --from=build /app/dist /usr/share/nginx/html

# Copier la configuration nginx personnalisée
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Exposer le port 80
EXPOSE 80

# Healthcheck
HEALTHCHECK --interval=30s --timeout=3s --start-period=5s --retries=3 \
  CMD curl -f http://localhost/ || exit 1

# Démarrer nginx
CMD ["nginx", "-g", "daemon off;"]