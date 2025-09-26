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
  UseGuards,
} from '@nestjs/common';
import { ProductsService } from './products.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';

// Importar guards e decorators
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RoleGuard } from '../auth/guards/role.guard';
import { Roles } from '../auth/decorators/roles.decorator';
import { Public } from '../auth/decorators/public.decorator';
import { UserRole } from '../users/entities/user.entity';

@Controller('products')
@UseGuards(JwtAuthGuard, RoleGuard) // Proteção padrão para todas as rotas
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  // CRIAR PRODUTO - SÓ ADMIN
  @Post()
  @Roles(UserRole.ADMIN) // 👈 SÓ ADMIN PODE CRIAR
  async create(@Body() createProductDto: CreateProductDto) {
    const product = await this.productsService.create(createProductDto);
    return {
      statusCode: HttpStatus.CREATED,
      message: 'Produto criado com sucesso',
      data: product,
    };
  }

  // LISTAR PRODUTOS - PÚBLICO
  @Get()
  @Public() // 👈 ROTA PÚBLICA
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

  // VERIFICAR ESTOQUE - PÚBLICO
  @Get('check-stock/:id/:quantity')
  @Public() // 👈 ROTA PÚBLICA
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

  // VER UM PRODUTO - PÚBLICO
  @Get(':id')
  @Public() // 👈 ROTA PÚBLICA
  async findOne(@Param('id', ParseIntPipe) id: number) {
    const product = await this.productsService.findOne(id);
    return {
      statusCode: HttpStatus.OK,
      message: 'Produto encontrado',
      data: product,
    };
  }

  // ATUALIZAR PRODUTO - SÓ ADMIN
  @Patch(':id')
  @Roles(UserRole.ADMIN) // 👈 SÓ ADMIN PODE ATUALIZAR
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

  // DELETAR PRODUTO - SÓ ADMIN
  @Delete(':id')
  @Roles(UserRole.ADMIN) // 👈 SÓ ADMIN PODE DELETAR
  async remove(@Param('id', ParseIntPipe) id: number) {
    await this.productsService.remove(id);
    return {
      statusCode: HttpStatus.OK,
      message: 'Produto removido com sucesso',
    };
  }
}