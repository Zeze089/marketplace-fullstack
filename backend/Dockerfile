# backend/Dockerfile

# Estágio de desenvolvimento
FROM node:18-alpine AS development

# Definir diretório de trabalho
WORKDIR /app

# Copiar package.json e package-lock.json (se existir)
COPY package*.json ./

# Instalar dependências
RUN npm ci --only=development

# Copiar código fonte
COPY . .

# Expor porta
EXPOSE 3001

# Comando para desenvolvimento
CMD ["npm", "run", "start:dev"]

# Estágio de build para produção
FROM node:18-alpine AS build

WORKDIR /app

# Copiar package.json
COPY package*.json ./

# Instalar todas as dependências
RUN npm ci

# Copiar código
COPY . .

# Fazer build
RUN npm run build

# Remover dependências de dev para reduzir tamanho
RUN npm ci --only=production && npm cache clean --force

# Estágio de produção
FROM node:18-alpine AS production

# Criar usuário não-root para segurança
RUN addgroup -g 1001 -S nodejs
RUN adduser -S nestjs -u 1001

WORKDIR /app

# Copiar apenas arquivos necessários do estágio build
COPY --from=build --chown=nestjs:nodejs /app/dist ./dist
COPY --from=build --chown=nestjs:nodejs /app/node_modules ./node_modules
COPY --from=build --chown=nestjs:nodejs /app/package.json ./package.json

# Mudar para usuário não-root
USER nestjs

# Expor porta
EXPOSE 3001

# Comando para produção
CMD ["node", "dist/main.js"]