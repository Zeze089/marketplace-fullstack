// backend/src/database/seeds/seeds.service.ts

import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { hash } from 'bcrypt';

import { User, UserRole } from '../../modules/users/entities/user.entity';
import { Product } from '../../modules/products/entities/product.entity';

@Injectable()
export class SeedsService {
  private readonly logger = new Logger(SeedsService.name);

  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    @InjectRepository(Product)
    private readonly productRepository: Repository<Product>,
  ) {}

  async runAllSeeds(): Promise<void> {
    this.logger.log('🌱 Iniciando seeds...');

    try {
      await this.seedUsers();
      await this.seedProducts();
      
      this.logger.log('✅ Seeds executados com sucesso!');
    } catch (error) {
      this.logger.error('❌ Erro ao executar seeds:', error);
      throw error;
    }
  }

  private async seedUsers(): Promise<void> {
    this.logger.log('👥 Criando usuários padrão...');

    // Verificar se já existem usuários
    const existingUsers = await this.userRepository.count();
    if (existingUsers > 0) {
      this.logger.log('ℹ️ Usuários já existem, pulando seed de usuários');
      return;
    }

    const users = [
      {
        name: 'Administrador do Sistema',
        email: 'admin@marketplace.com',
        cpf: '11111111111',
        phone: '11999999999',
        password: await hash('admin123', 12),
        role: UserRole.ADMIN,
        isActive: true,
        emailVerified: true,
      },
      
      {
        name: 'Usuário de Teste',
        email: 'user@marketplace.com',
        cpf: '22222222222',
        phone: '11888888888',
        password: await hash('user123', 12),
        role: UserRole.USER,
        isActive: true,
        emailVerified: true,
      },
      {
        name: 'João Silva',
        email: 'joao@teste.com',
        cpf: '33333333333',
        phone: '11777777777',
        password: await hash('123456', 12),
        role: UserRole.USER,
        isActive: true,
        emailVerified: true,
      }, 
    ];

    await this.userRepository.save(users);
    this.logger.log(`✅ ${users.length} usuários criados com sucesso`);
  }

  private async seedProducts(): Promise<void> {
    this.logger.log('📦 Criando produtos de exemplo...');

    // Verificar se já existem produtos
    const existingProducts = await this.productRepository.count();
    if (existingProducts > 0) {
      this.logger.log('ℹ️ Produtos já existem, pulando seed de produtos');
      return;
    }

    const products = [
      {
        name: 'iPhone 15 Pro',
        description: 'Smartphone Apple com chip A17 Pro, câmera profissional e tela de 6.1 polegadas',
        price: 4999.99,
        stock: 25,
        category: 'Eletrônicos',
        imageUrl: 'https://images.unsplash.com/photo-1592750475338-74b7b21085ab?w=500',
        isActive: true,
      },
      {
        name: 'MacBook Air M2',
        description: 'Notebook Apple ultracompacto com chip M2, 8GB RAM e 256GB SSD',
        price: 8999.99,
        stock: 15,
        category: 'Computadores',
        imageUrl: 'https://images.unsplash.com/photo-1541807084-5c52b6b3adef?w=500',
        isActive: true,
      },
      {
        name: 'Samsung Galaxy S24',
        description: 'Smartphone Android flagship com câmera de 200MP e 5G',
        price: 3499.99,
        stock: 30,
        category: 'Eletrônicos',
        imageUrl: 'https://images.unsplash.com/photo-1610945265064-0e34e5519bbf?w=500',
        isActive: true,
      },
      {
        name: 'Dell XPS 13',
        description: 'Ultrabook profissional com Intel Core i7, 16GB RAM e tela InfinityEdge',
        price: 6799.99,
        stock: 12,
        category: 'Computadores',
        imageUrl: 'https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=500',
        isActive: true,
      },
      {
        name: 'AirPods Pro 2ª geração',
        description: 'Fones de ouvido sem fio com cancelamento ativo de ruído',
        price: 1899.99,
        stock: 50,
        category: 'Acessórios',
        imageUrl: 'https://images.unsplash.com/photo-1572569511254-d8f925fe2cbb?w=500',
        isActive: true,
      },
      {
        name: 'iPad Air 5ª geração',
        description: 'Tablet Apple com chip M1, tela de 10.9 polegadas e suporte ao Apple Pencil',
        price: 3999.99,
        stock: 20,
        category: 'Tablets',
        imageUrl: 'https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?w=500',
        isActive: true,
      },
      {
        name: 'PlayStation 5',
        description: 'Console de videogame com SSD ultra-rápido e gráficos 4K',
        price: 4199.99,
        stock: 8,
        category: 'Games',
        imageUrl: 'https://images.unsplash.com/photo-1606813907291-d86efa9b94db?w=500',
        isActive: true,
      },
      {
        name: 'Nintendo Switch OLED',
        description: 'Console portátil com tela OLED de 7 polegadas e controles Joy-Con',
        price: 2299.99,
        stock: 35,
        category: 'Games',
        imageUrl: 'https://images.unsplash.com/photo-1578303512597-81e6cc155b3e?w=500',
        isActive: true,
      },
      {
        name: 'Monitor LG UltraWide 34"',
        description: 'Monitor curvo 21:9 com resolução QHD e tecnologia IPS',
        price: 1999.99,
        stock: 18,
        category: 'Periféricos',
        imageUrl: 'https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?w=500',
        isActive: true,
      },
      {
        name: 'Teclado Mecânico Keychron K2',
        description: 'Teclado mecânico sem fio com switches Blue e retroiluminação RGB',
        price: 599.99,
        stock: 40,
        category: 'Periféricos',
        imageUrl: 'https://images.unsplash.com/photo-1541140532154-b024d705b90a?w=500',
        isActive: true,
      },
    ];

    await this.productRepository.save(products);
    this.logger.log(`✅ ${products.length} produtos criados com sucesso`);
  }

  async clearAllData(): Promise<void> {
    this.logger.log('🗑️ Limpando dados existentes...');
    
    await this.productRepository.delete({});
    await this.userRepository.delete({});
    
    this.logger.log('✅ Dados limpos com sucesso');
  }
}