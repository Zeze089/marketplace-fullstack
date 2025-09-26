// backend/src/config/database.config.ts

export const databaseConfig = {
  type: 'postgres' as const,
  host: process.env.DB_HOST || 'localhost',
  port: parseInt(process.env.DB_PORT || '5432'),
  username: process.env.DB_USERNAME || 'postgres',
  password: process.env.DB_PASSWORD || 'postgres123',
  database: process.env.DB_DATABASE || 'marketplace',
  autoLoadEntities: true,
  synchronize: process.env.NODE_ENV !== 'production', // true para dev, false para prod
  logging: process.env.NODE_ENV === 'development',
};