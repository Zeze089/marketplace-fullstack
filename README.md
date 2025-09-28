# 🛍️ Marketplace Fullstack

Aplicação completa de marketplace desenvolvida para o processo seletivo da **UX Software**.

## 🚀 Como Executar

### Pré-requisitos
- Node.js 18+
- Docker e Docker Compose

### Execução Completa
```bash
git clone https://github.com/seu-usuario/marketplace-fullstack.git
cd marketplace-fullstack

# 1. Backend
cd backend
cp .env.example .env  # Configure as variáveis
docker-compose up -d  # Subir PostgreSQL
npm install
npm run start:dev     # Backend na porta 3001
npm run seed          # Popular com dados de teste

# 2. Frontend (nova aba do terminal)
cd ../frontend
npm install
npm run dev          # Frontend na porta 3000
```

### Variáveis de Ambiente (.env no backend/)
```env
DATABASE_HOST=postgres
DATABASE_PORT=5432
DATABASE_USERNAME=postgres
DATABASE_PASSWORD=postgres123
DATABASE_NAME=marketplace_db

JWT_SECRET=seu-jwt-secret-muito-seguro
JWT_EXPIRATION=24h

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
# Backend completo
docker-compose up -d

# Logs
docker-compose logs -f backend

# Parar
docker-compose down
```

## 📋 API Endpoints

**Base:** `http://localhost:3001/api/v1`

### Autenticação
- `POST /auth/register` - Cadastro
- `POST /auth/login` - Login  
- `GET /auth/profile` - Perfil (auth)

### Produtos
- `GET /products` - Listar (público)
- `POST /products` - Criar (admin)
- `PATCH /products/:id` - Editar (admin)
- `DELETE /products/:id` - Deletar (admin)

### Carrinho
- `GET /cart` - Ver carrinho (auth)
- `POST /cart/add` - Adicionar (auth)
- `POST /cart/update` - Atualizar (auth)
- `DELETE /cart/remove/:id` - Remover (auth)

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

## 🚀 Deploy

**URLs:**
- Frontend: http://localhost:3000
- Backend: http://localhost:3001
- API Docs: http://localhost:3001/api

## 📞 Suporte

Para dúvidas técnicas, verificar:
1. Logs do Docker: `docker-compose logs`
2. Console do navegador (F12)
3. Seeds executados: `npm run seed`
4. Variáveis de ambiente configuradas

---

**Desenvolvido para UX Software - Setembro 2025**

Projeto fullstack completo demonstrando competência em desenvolvimento moderno com foco em UX/UI e boas práticas de código.