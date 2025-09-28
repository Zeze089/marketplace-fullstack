// frontend/src/services/products.service.ts

import api from './api';
import { ApiResponse, Product, CreateProductRequest } from '@/types';

class ProductsService {
  // Listar todos os produtos (público)
  async getProducts(): Promise<Product[]> {
    const response = await api.get<ApiResponse<Product[]>>('/products');
    return response.data.data || [];
  }

  // Buscar produto por ID
  async getProductById(id: number): Promise<Product> {
    const response = await api.get<ApiResponse<Product>>(`/products/${id}`);
    return response.data.data!;
  }

  // Criar produto (admin only)
  async createProduct(productData: CreateProductRequest): Promise<Product> {
    const response = await api.post<ApiResponse<Product>>('/products', productData);
    return response.data.data!;
  }

  // Atualizar produto (admin only)
  async updateProduct(id: number, productData: Partial<CreateProductRequest>): Promise<Product> {
    const response = await api.patch<ApiResponse<Product>>(`/products/${id}`, productData);
    return response.data.data!;
  }

  // Deletar produto (admin only)
  async deleteProduct(id: number): Promise<void> {
    await api.delete(`/products/${id}`);
  }

  // Verificar estoque
  async checkStock(productId: number, quantity: number): Promise<boolean> {
    const response = await api.get<ApiResponse<{ available: boolean }>>(
      `/products/check-stock/${productId}/${quantity}`
    );
    return response.data.data!.available;
  }
}

export const productsService = new ProductsService();