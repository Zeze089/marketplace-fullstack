FROM node:20-alpine

WORKDIR /app

# Copiar arquivos de dependências
COPY backend/package*.json ./

# Instalar dependências (npm 10 vem com Node 20)
RUN npm ci --omit=dev

# Copiar todo o código
COPY backend/ ./

# Build
RUN npm install --save-dev @nestjs/cli typescript
RUN npm run build

EXPOSE 3001

CMD ["node", "dist/main.js"]