# 🛍️ Marketplace Fullstack

API REST completa para loja online desenvolvida para o processo seletivo da **UX Software**.

## 🚀 Como Executar

### Pré-requisitos
- Node.js 18+
- Docker e Docker Compose

### Execução Rápida
```bash
git clone https://github.com/seu-usuario/marketplace-fullstack.git
cd marketplace-fullstack

# Criar .env na pasta backend/ (ver variáveis abaixo)
# Subir aplicação
docker-compose up -d

# Popular banco com dados de teste
cd backend && npm run seed
```

### Variáveis de Ambiente (.env)
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

## 📡 API Endpoints

**Base URL:** `http://localhost:3001/api/v1`

### Autenticação
- `POST /auth/register` - Cadastrar usuário
- `POST /auth/login` - Login
- `GET /auth/profile` - Ver perfil (auth)

### Produtos  
- `GET /products` - Listar produtos (público)
- `POST /products` - Criar produto (admin only)
- `PATCH /products/:id` - Atualizar (admin only)
- `DELETE /products/:id` - Deletar (admin only)

### Carrinho
- `GET /cart` - Ver carrinho (auth)
- `POST /cart/add` - Adicionar produto (auth)
- `POST /cart/update` - Atualizar quantidade (auth)
- `DELETE /cart/remove/:id` - Remover produto (auth)

## 🧪 Usuários de Teste

Após executar `npm run seed`:

**Admin:**
```json
{
  "email": "admin@marketplace.com",
  "password": "admin123"
}
```

**Usuário:**
```json
{
  "email": "user@marketplace.com", 
  "password": "user123"
}
```

## 🔄 Fluxo de Teste

1. **Login Admin** → Criar produtos
2. **Login User** → Adicionar ao carrinho
3. **Testar CRUD** completo

## 🛡️ Funcionalidades

- ✅ Autenticação JWT
- ✅ Proteção por roles (admin/user)
- ✅ CRUD de produtos
- ✅ Sistema de carrinho
- ✅ Validações de negócio
- ✅ Seeds automáticos
- ✅ Docker configurado

## 🐳 Docker

```bash
# Subir aplicação
docker-compose up -d

# Ver logs
docker-compose logs -f backend

# Parar
docker-compose down
```

## 📊 Status

**Backend:** 100% Completo e testado
**Frontend:** Em desenvolvimento (NextJS + TailwindCSS)

---

**Desenvolvido para UX Software - Setembro 2025**