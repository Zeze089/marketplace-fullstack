// backend/src/app.module.ts

import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { databaseConfig } from './config/database.config';

// Importar entidades
import { User } from './modules/users/entities/user.entity';
import { Product } from './modules/products/entities/product.entity';
import { Cart } from './modules/cart/entities/cart.entity';
import { CartItem } from './modules/cart/entities/cart-item.entity';

// Importar módulos
import { AuthModule } from './modules/auth/auth.module';

// Importar controller principal
import { AppController } from './app.controller'; // 👈 ADICIONADO

@Module({
  imports: [
    // Configuration
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
    }),

    // Database
    TypeOrmModule.forRoot({
      ...databaseConfig,
      entities: [User, Product, Cart, CartItem],
    }),

    // TypeORM Feature modules (para usar repositórios)
    TypeOrmModule.forFeature([User, Product, Cart, CartItem]),

    // Feature modules
    AuthModule,
  ],
  controllers: [AppController], // 👈 ADICIONADO
  providers: [],
})
export class AppModule {}