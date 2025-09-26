// backend/src/modules/cart/cart.controller.ts

import {
  Controller,
  Post,
  Get,
  Delete,
  Body,
  Param,
  HttpStatus,
  UseGuards,
  ParseIntPipe,
} from '@nestjs/common';
import { CartService } from './cart.service';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { CurrentUser } from '../auth/decorators/current-user.decorator';

// DTOs simples para o carrinho
interface AddToCartDto {
  productId: number;
  quantity: number;
}

@Controller('cart')
@UseGuards(JwtAuthGuard) // Todas as rotas do carrinho precisam de autenticação
export class CartController {
  constructor(private readonly cartService: CartService) {}

  // ADICIONAR PRODUTO AO CARRINHO
  @Post('add')
  async addToCart(
    @CurrentUser() user: any,
    @Body() addToCartDto: AddToCartDto,
  ) {
    const { productId, quantity } = addToCartDto;
    const result = await this.cartService.addItem(user.id, productId, quantity);
    
    return {
      statusCode: HttpStatus.OK,
      message: 'Produto adicionado ao carrinho com sucesso',
      data: result,
    };
  }

  // BUSCAR CARRINHO DO USUÁRIO
  @Get()
  async getCart(@CurrentUser() user: any) {
    const result = await this.cartService.getCart(user.id);
    
    return {
      statusCode: HttpStatus.OK,
      message: 'Carrinho carregado com sucesso',
      data: result,
    };
  }

  // REMOVER PRODUTO DO CARRINHO
  @Delete('remove/:productId')
  async removeFromCart(
    @CurrentUser() user: any,
    @Param('productId', ParseIntPipe) productId: number,
  ) {
    const result = await this.cartService.removeItem(user.id, productId);
    
    return {
      statusCode: HttpStatus.OK,
      message: 'Produto removido do carrinho com sucesso',
      data: result,
    };
  }

  // LIMPAR CARRINHO COMPLETO
  @Delete('clear')
  async clearCart(@CurrentUser() user: any) {
    const result = await this.cartService.clearCart(user.id);
    
    return {
      statusCode: HttpStatus.OK,
      message: 'Carrinho limpo com sucesso',
      data: result,
    };
  }

  // ATUALIZAR QUANTIDADE DE UM PRODUTO
  @Post('update')
  async updateQuantity(
    @CurrentUser() user: any,
    @Body() updateDto: { productId: number; quantity: number },
  ) {
    const { productId, quantity } = updateDto;
    
    // Remove o item atual e adiciona com nova quantidade
    await this.cartService.removeItem(user.id, productId);
    
    if (quantity > 0) {
      const result = await this.cartService.addItem(user.id, productId, quantity);
      return {
        statusCode: HttpStatus.OK,
        message: 'Quantidade atualizada com sucesso',
        data: result,
      };
    } else {
      const result = await this.cartService.getCart(user.id);
      return {
        statusCode: HttpStatus.OK,
        message: 'Produto removido do carrinho',
        data: result,
      };
    }
  }
}