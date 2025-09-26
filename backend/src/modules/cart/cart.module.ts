// backend/src/modules/cart/cart.module.ts

import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CartService } from './cart.service';
import { CartController } from './cart.controller';

// Importando entidades que o cart service usa
import { User } from '../users/entities/user.entity';
import { Product } from '../products/entities/product.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      User,     // Para validar usuário
      Product,  // Para validar produtos e estoque
    ]),
  ],
  controllers: [CartController],
  providers: [CartService],
  exports: [CartService], // Exporta para usar em outros módulos
})
export class CartModule {}