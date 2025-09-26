// backend/src/modules/cart/cart.service.ts

import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

// Temporariamente vamos importar as entidades que já existem e funcionam
import { User } from '../users/entities/user.entity';
import { Product } from '../products/entities/product.entity';

// Interfaces temporárias para representar Cart e CartItem
interface CartData {
  id: number;
  userId: number;
  createdAt: Date;
  updatedAt: Date;
}

interface CartItemData {
  id: number;
  cartId: number;
  productId: number;
  quantity: number;
  product?: Product;
}

@Injectable()
export class CartService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    @InjectRepository(Product)
    private readonly productRepository: Repository<Product>,
  ) {}

  // Simulação básica de carrinho em memória (para testar estrutura)
  private carts: Map<number, CartItemData[]> = new Map();

  // Adicionar produto ao carrinho
  async addItem(userId: number, productId: number, quantity: number = 1) {
    // Verificar se produto existe
    const product = await this.productRepository.findOne({
      where: { id: productId, isActive: true },
    });

    if (!product) {
      throw new NotFoundException('Produto não encontrado ou inativo');
    }

    // Verificar estoque
    if (!product.hasStock(quantity)) {
      throw new BadRequestException(`Estoque insuficiente. Disponível: ${product.stock}`);
    }

    // Buscar carrinho do usuário
    let userCart = this.carts.get(userId) || [];

    // Verificar se item já existe
    const existingItemIndex = userCart.findIndex(item => item.productId === productId);

    if (existingItemIndex >= 0) {
      // Atualizar quantidade
      userCart[existingItemIndex].quantity += quantity;
    } else {
      // Adicionar novo item
      const newItem: CartItemData = {
        id: Date.now(), // ID temporário
        cartId: userId,
        productId,
        quantity,
        product,
      };
      userCart.push(newItem);
    }

    this.carts.set(userId, userCart);

    return this.getCart(userId);
  }

  // Buscar carrinho do usuário
  async getCart(userId: number) {
    const userCart = this.carts.get(userId) || [];
    
    // Enriquecer com dados dos produtos
    const cartWithProducts = await Promise.all(
      userCart.map(async (item) => {
        const product = await this.productRepository.findOne({
          where: { id: item.productId },
        });

        return {
          id: item.id,
          quantity: item.quantity,
          subtotal: Number(product?.price || 0) * item.quantity,
          product: {
            id: product?.id,
            name: product?.name,
            price: product?.price,
            stock: product?.stock,
            imageUrl: product?.imageUrl,
            category: product?.category,
          },
        };
      })
    );

    const totalPrice = cartWithProducts.reduce((sum, item) => sum + item.subtotal, 0);
    const totalItems = cartWithProducts.reduce((sum, item) => sum + item.quantity, 0);

    return {
      cart: {
        userId,
        itemCount: cartWithProducts.length,
      },
      items: cartWithProducts,
      summary: {
        totalItems,
        totalPrice,
        itemCount: cartWithProducts.length,
      },
    };
  }

  // Remover item do carrinho
  async removeItem(userId: number, productId: number) {
    let userCart = this.carts.get(userId) || [];
    userCart = userCart.filter(item => item.productId !== productId);
    this.carts.set(userId, userCart);

    return this.getCart(userId);
  }

  // Limpar carrinho
  async clearCart(userId: number) {
    this.carts.delete(userId);
    return {
      message: 'Carrinho limpo com sucesso',
      cart: await this.getCart(userId),
    };
  }
}