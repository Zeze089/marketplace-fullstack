// frontend/src/types/index.ts

// Tipos de resposta da API
export interface ApiResponse<T = any> {
  statusCode: number;
  message: string;
  data?: T;
}

// Tipos de usuário
export enum UserRole {
  USER = 'USER',
  ADMIN = 'ADMIN',
}

export interface User {
  id: number;
  name: string;
  email: string;
  cpf: string;
  phone: string;
  role: UserRole;
  isActive: boolean;
  emailVerified: boolean;
  createdAt: string;
  updatedAt: string;
}

// Tipos de autenticação
export interface LoginRequest {
  email: string;
  password: string;
}

export interface RegisterRequest {
  name: string;
  email: string;
  cpf: string;
  phone: string;
  password: string;
}

export interface AuthResponse {
  access_token: string;
  user: User;
}

// Tipos de produto
export interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
  stock: number;
  category: string;
  imageUrl: string;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface CreateProductRequest {
  name: string;
  description: string;
  price: number;
  stock: number;
  category: string;
  imageUrl: string;
}

// Tipos de carrinho
export interface CartItem {
  id: number;
  quantity: number;
  subtotal: number;
  product: {
    id: number;
    name: string;
    price: number;
    stock: number;
    imageUrl: string;
    category: string;
  };
}

export interface Cart {
  cart: {
    userId: number;
    itemCount: number;
  };
  items: CartItem[];
  summary: {
    totalItems: number;
    totalPrice: number;
    itemCount: number;
  };
}

export interface AddToCartRequest {
  productId: number;
  quantity: number;
}

export interface UpdateCartRequest {
  productId: number;
  quantity: number;
}