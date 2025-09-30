# 🛍️ Marketplace Fullstack

Aplicação completa de marketplace desenvolvida para o processo seletivo da **UX Software**.

## 🚀 Como Executar

### Pré-requisitos
- Node.js 18+
- Docker e Docker Compose

### Execução Completa

```bash
# Clone o repositório
git clone https://github.com/seu-usuario/marketplace-fullstack.git
cd marketplace-fullstack

# 1. Subir Docker (PostgreSQL, Redis, pgAdmin)
docker-compose up -d

# 2. Configurar Backend
cd backend
cp .env.example .env  # Configure as variáveis (veja seção abaixo)
npm install
```

### ⚠️ IMPORTANTE - Criar Tabelas no Banco de Dados

Após instalar as dependências, siga estes passos:

1. Abra o arquivo `src/config/database.config.ts`
2. Temporariamente mude `synchronize: false` para `synchronize: true`
3. Inicie o backend: `npm start`
4. Aguarde ver a mensagem de conexão com o banco
5. Pare o backend (Ctrl+C)
6. Volte `synchronize: true` para `synchronize: false`
7. Inicie novamente: `npm start`
8. (Opcional) Popular com dados de teste: `npm run seed`

```bash
# 3. Configurar Frontend (em nova aba do terminal)
cd ../frontend
npm install
npm run dev
```

**Acesse:** 
- Frontend: http://localhost:3000
- Backend: http://localhost:3001
- API Docs: http://localhost:3001/api

### Variáveis de Ambiente (.env no backend/)

Crie o arquivo `.env` na pasta `backend/` com:

```env
# Database
DATABASE_HOST=localhost
DATABASE_PORT=5432
DATABASE_USERNAME=postgres
DATABASE_PASSWORD=postgres123
DATABASE_NAME=marketplace

# JWT
JWT_SECRET=seu-jwt-secret-muito-seguro-aqui
JWT_EXPIRATION=24h

# Email (opcional para desenvolvimento)
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=seu-email@gmail.com
SMTP_PASS=sua-senha-app

# App
NODE_ENV=development
PORT=3001
```

## 📡 Funcionalidades

### Backend (NestJS + PostgreSQL)
- **Autenticação:** JWT com roles (admin/user)
- **Produtos:** CRUD completo com proteção
- **Carrinho:** Adicionar, remover, atualizar itens
- **Usuários:** Cadastro com verificação de email
- **Segurança:** Guards, validações, hash de senhas

### Frontend (NextJS + TypeScript)
- **Interface:** Responsiva com TailwindCSS
- **Páginas:** Login, Cadastro, Produtos, Carrinho
- **Recursos:** Máscaras CPF/telefone, validações
- **UX:** Animações, notificações, contador carrinho
- **Admin:** CRUD de produtos com modal

## 🧪 Usuários de Teste

Após executar `npm run seed` no backend:

```json
Admin: {
  "email": "admin@marketplace.com",
  "password": "admin123"
}

Usuário: {
  "email": "user@marketplace.com", 
  "password": "user123"
}
```

## 📱 Páginas e Funcionalidades

### 🔐 Autenticação
- **Login:** Validação, redirecionamento automático
- **Cadastro:** Máscaras CPF (000.000.000-00), telefone ((00) 00000-0000)
- **Proteção:** Rotas protegidas, logout automático

### 🛒 Produtos (Home)
- **Visualização:** Cards responsivos, imagens inteligentes
- **Interação:** Modal detalhado ao clicar
- **Carrinho:** Adicionar com animação profissional
- **Admin:** Criar, editar, excluir produtos

### 🛍️ Carrinho
- **Gerenciar:** Atualizar quantidades, remover itens
- **Visual:** Contador no header, cálculo automático
- **UX:** Animações de feedback, estados vazios

## 🎨 Recursos Visuais

### Sistema Inteligente de Imagens
Detecta automaticamente o tipo de produto:
- "iPhone" → Imagem de smartphone
- "Camera PTZ" → Imagem de câmera profissional
- "MacBook" → Imagem de laptop
- "PlayStation" → Imagem de console

### Animações Profissionais
- Notificação deslizante ao adicionar produtos
- Contador do carrinho estilo WhatsApp
- Loading states e transições suaves
- Modal responsivo para detalhes

## 🔄 Fluxos Principais

### Cliente
1. Cadastro → Verificação email → Login
2. Navegar produtos → Ver detalhes → Adicionar carrinho
3. Gerenciar carrinho → Finalizar compra

### Admin
1. Login → Acessar área admin
2. Criar/editar/excluir produtos
3. Gerenciar estoque e categorias

## 📊 Tecnologias

### Backend
- NestJS, TypeScript, PostgreSQL
- JWT, bcrypt, TypeORM
- Docker, Swagger docs

### Frontend  
- NextJS 14, TypeScript, TailwindCSS
- React Hook Form, Zod, Axios
- Context API, Lucide Icons

## 🐳 Docker

```bash
# Subir todos os serviços
docker-compose up -d

# Ver logs
docker-compose logs -f

# Parar serviços
docker-compose down

# Parar e remover volumes (apaga dados)
docker-compose down -v
```

## 📋 API Endpoints

**Base:** `http://localhost:3001/api/v1`

### Autenticação
- `POST /auth/register` - Cadastro
- `POST /auth/login` - Login  
- `GET /auth/profile` - Perfil (requer autenticação)

### Produtos
- `GET /products` - Listar (público)
- `POST /products` - Criar (admin)
- `PATCH /products/:id` - Editar (admin)
- `DELETE /products/:id` - Deletar (admin)

### Carrinho
- `GET /cart` - Ver carrinho (requer autenticação)
- `POST /cart/add` - Adicionar item (requer autenticação)
- `POST /cart/update` - Atualizar quantidade (requer autenticação)
- `DELETE /cart/remove/:id` - Remover item (requer autenticação)

## ✅ Checklist PS

Todos os requisitos implementados:

### Obrigatórios
- ✅ NextJS com TypeScript
- ✅ TailwindCSS para estilização
- ✅ Três páginas: Login, Cadastro, Produtos
- ✅ Carrinho de compras funcional
- ✅ Integração completa com API
- ✅ Tratamento de erros da API
- ✅ Máscaras CPF (000.000.000-00) e telefone ((00) 00000-0000)

### Extras Implementados
- ✅ Sistema de imagens inteligentes
- ✅ Animações profissionais
- ✅ Modal de detalhes dos produtos
- ✅ Contador de carrinho em tempo real
- ✅ Interface responsiva completa
- ✅ Estados de loading e feedback visual
- ✅ Proteção de rotas e roles

## 🔧 Troubleshooting

### Erro de conexão com banco de dados
1. Verifique se o Docker está rodando: `docker ps`
2. Certifique-se que o container PostgreSQL está ativo
3. Confirme as credenciais no arquivo `.env`
4. Verifique se seguiu os passos de criação de tabelas

### Tabelas não existem
1. Siga a seção "IMPORTANTE - Criar Tabelas no Banco de Dados"
2. Certifique-se de voltar `synchronize` para `false` após criar as tabelas

### Logs úteis
```bash
# Logs do backend
docker-compose logs backend

# Logs do PostgreSQL
docker-compose logs postgres

# Console do navegador (F12)
```

### Porta já em uso
```bash
# Verificar processos na porta 3000 (frontend)
lsof -ti:3000 | xargs kill -9

# Verificar processos na porta 3001 (backend)
lsof -ti:3001 | xargs kill -9
```

---

**Desenvolvido para UX Software - Setembro 2025**

Projeto fullstack completo demonstrando competência em desenvolvimento moderno com foco em UX/UI e boas práticas de código.