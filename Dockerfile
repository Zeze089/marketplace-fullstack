FROM node:18-alpine

WORKDIR /app

# Copiar package files do backend
COPY backend/package*.json ./

# Instalar dependências sem verificação de peer dependencies
RUN npm install --legacy-peer-deps

# Copiar código do backend
COPY backend/ ./

# Build da aplicação
RUN npm run build

# Limpar devDependencies
RUN npm prune --production

EXPOSE 3001

CMD ["node", "dist/main.js"]