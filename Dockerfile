FROM node:18-alpine

WORKDIR /app

# Copiar package files do backend
COPY backend/package*.json ./

RUN npm ci

# Copiar código do backend
COPY backend/ ./

RUN npm run build

RUN npm ci --only=production && npm cache clean --force

EXPOSE 3001

CMD ["node", "dist/main.js"]