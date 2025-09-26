// backend/src/database/seeds/seeds.module.ts

import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SeedsService } from './seeds.service';
// import { SeedsCommand } from './seeds.command'; // 👈 COMENTADO POR ENQUANTO

import { User } from '../../modules/users/entities/user.entity';
import { Product } from '../../modules/products/entities/product.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([User, Product]),
  ],
  providers: [
    SeedsService,
    // SeedsCommand, // 👈 COMENTADO POR ENQUANTO
  ],
  exports: [SeedsService],
})
export class SeedsModule {}