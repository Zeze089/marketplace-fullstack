// backend/src/config/database.config.ts

import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { DataSource } from 'typeorm';

// VERSÃO SIMPLIFICADA - sem imports das entidades no momento
export const databaseConfig: TypeOrmModuleOptions = {
  type: 'postgres',
  host: process.env.DB_HOST || 'localhost',
  port: parseInt(process.env.DB_PORT || '5432'), // 👈 CORRIGIDO: adicionei || '5432'
  username: process.env.DB_USERNAME || 'postgres',
  password: process.env.DB_PASSWORD || 'postgres123',
  database: process.env.DB_DATABASE || 'marketplace',
  autoLoadEntities: true, // 👈 Deixa o NestJS carregar automaticamente
  synchronize: process.env.NODE_ENV === 'development',
  logging: true,
};

// Para as migrations - versão simplificada
export const AppDataSource = new DataSource({
  type: 'postgres',
  host: process.env.DB_HOST || 'localhost',
  port: parseInt(process.env.DB_PORT || '5432'), // 👈 CORRIGIDO: adicionei || '5432'
  username: process.env.DB_USERNAME || 'postgres',
  password: process.env.DB_PASSWORD || 'postgres123',
  database: process.env.DB_DATABASE || 'marketplace',
  entities: ['src/**/*.entity.{ts,js}'],
  migrations: ['src/database/migrations/*.{ts,js}'],
  synchronize: false,
  logging: true,
});

export default AppDataSource;