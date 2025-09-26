// backend/src/modules/products/products.service.ts

import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Product } from './entities/product.entity';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';

@Injectable()
export class ProductsService {
  constructor(
    @InjectRepository(Product)
    private readonly productRepository: Repository<Product>,
  ) {}

  async create(createProductDto: CreateProductDto): Promise<Product> {
    try {
      console.log('Creating product:', createProductDto);
      const product = this.productRepository.create(createProductDto);
      return await this.productRepository.save(product);
    } catch (error) {
      console.error('Error creating product:', error);
      throw new BadRequestException('Erro ao criar produto');
    }
  }

  async findAll(query: any = {}): Promise<any> {
    try {
      console.log('Finding all products with query:', query);
      
      const { page = 1, limit = 10, onlyActive = true } = query;
      
      // Versão simples sem query builder
      const whereConditions = onlyActive ? { isActive: true } : {};
      
      const [products, total] = await this.productRepository.findAndCount({
        where: whereConditions,
        take: limit,
        skip: (page - 1) * limit,
        order: { createdAt: 'DESC' },
      });

      console.log(`Found ${products.length} products out of ${total} total`);

      return {
        data: products,
        meta: {
          total,
          page,
          limit,
          totalPages: Math.ceil(total / limit),
        },
      };
    } catch (error) {
      console.error('Error finding products:', error);
      throw new BadRequestException(`Erro ao buscar produtos: ${error.message}`);
    }
  }

  async findOne(id: number): Promise<Product> {
    try {
      console.log('Finding product with ID:', id);
      const product = await this.productRepository.findOne({ where: { id } });
      
      if (!product) {
        throw new NotFoundException(`Produto com ID ${id} não encontrado`);
      }

      return product;
    } catch (error) {
      console.error('Error finding product:', error);
      throw error;
    }
  }

  async update(id: number, updateProductDto: UpdateProductDto): Promise<Product> {
    const product = await this.findOne(id);
    Object.assign(product, updateProductDto);
    return await this.productRepository.save(product);
  }

  async remove(id: number): Promise<void> {
    const product = await this.findOne(id);
    await this.productRepository.remove(product);
  }

  async checkStock(id: number, quantity: number = 1): Promise<boolean> {
    const product = await this.findOne(id);
    return product.hasStock(quantity);
  }
}