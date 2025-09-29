FROM node:18-alpine

WORKDIR /app

# Atualizar npm primeiro
RUN npm install -g npm@latest

# Copiar package files do backend
COPY backend/package*.json ./

# Instalar dependências forçando versão
RUN npm install --legacy-peer-deps --force

# Copiar código do backend
COPY backend/ ./

# Build da aplicação
RUN npm run build

# Limpar devDependencies
RUN npm prune --production

EXPOSE 3001

CMD ["node", "dist/main.js"]