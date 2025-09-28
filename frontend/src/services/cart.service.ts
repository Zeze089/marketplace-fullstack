// frontend/src/services/cart.service.ts

import api from './api';
import { ApiResponse, Cart, AddToCartRequest, UpdateCartRequest } from '@/types';

class CartService {
  // Buscar carrinho do usuário
  async getCart(): Promise<Cart> {
    const response = await api.get<ApiResponse<Cart>>('/cart');
    return response.data.data!;
  }

  // Adicionar produto ao carrinho
  async addToCart(request: AddToCartRequest): Promise<Cart> {
    const response = await api.post<ApiResponse<Cart>>('/cart/add', request);
    return response.data.data!;
  }

  // Atualizar quantidade de um produto
  async updateQuantity(request: UpdateCartRequest): Promise<Cart> {
    const response = await api.post<ApiResponse<Cart>>('/cart/update', request);
    return response.data.data!;
  }

  // Remover produto do carrinho
  async removeFromCart(productId: number): Promise<Cart> {
    const response = await api.delete<ApiResponse<Cart>>(`/cart/remove/${productId}`);
    return response.data.data!;
  }

  // Limpar carrinho
  async clearCart(): Promise<void> {
    await api.delete('/cart/clear');
  }
}

export const cartService = new CartService();