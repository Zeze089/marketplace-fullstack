// backend/src/modules/products/products.controller.ts

import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
  HttpStatus,
  ParseIntPipe,
} from '@nestjs/common';
import { ProductsService } from './products.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';

@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @Post()
  async create(@Body() createProductDto: CreateProductDto) {
    const product = await this.productsService.create(createProductDto);
    return {
      statusCode: HttpStatus.CREATED,
      message: 'Produto criado com sucesso',
      data: product,
    };
  }

  @Get()
  async findAll(
    @Query('page') page?: string,
    @Query('limit') limit?: string,
    @Query('category') category?: string,
    @Query('search') search?: string,
    @Query('minPrice') minPrice?: string,
    @Query('maxPrice') maxPrice?: string,
    @Query('onlyActive') onlyActive?: string,
  ) {
    try {
      // Converter parâmetros
      const queryParams = {
        page: page ? parseInt(page) : 1,
        limit: limit ? parseInt(limit) : 10,
        category: category || undefined,
        search: search || undefined,
        minPrice: minPrice ? parseFloat(minPrice) : undefined,
        maxPrice: maxPrice ? parseFloat(maxPrice) : undefined,
        onlyActive: onlyActive !== 'false',
      };

      const result = await this.productsService.findAll(queryParams);
      return {
        statusCode: HttpStatus.OK,
        message: 'Produtos listados com sucesso',
        ...result,
      };
    } catch (error) {
      console.error('Erro no findAll:', error);
      return {
        statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
        message: 'Erro interno do servidor',
        error: error.message,
      };
    }
  }

  // MOVER ROTAS ESPECÍFICAS ANTES DAS ROTAS COM PARÂMETROS
  @Get('check-stock/:id/:quantity')
  async checkStock(
    @Param('id', ParseIntPipe) id: number,
    @Param('quantity', ParseIntPipe) quantity: number,
  ) {
    const available = await this.productsService.checkStock(id, quantity);
    return {
      statusCode: HttpStatus.OK,
      message: 'Disponibilidade verificada',
      data: { available, productId: id, requestedQuantity: quantity },
    };
  }

  @Get(':id')
  async findOne(@Param('id', ParseIntPipe) id: number) {
    const product = await this.productsService.findOne(id);
    return {
      statusCode: HttpStatus.OK,
      message: 'Produto encontrado',
      data: product,
    };
  }

  @Patch(':id')
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateProductDto: UpdateProductDto,
  ) {
    const product = await this.productsService.update(id, updateProductDto);
    return {
      statusCode: HttpStatus.OK,
      message: 'Produto atualizado com sucesso',
      data: product,
    };
  }

  @Delete(':id')
  async remove(@Param('id', ParseIntPipe) id: number) {
    await this.productsService.remove(id);
    return {
      statusCode: HttpStatus.OK,
      message: 'Produto removido com sucesso',
    };
  }
}