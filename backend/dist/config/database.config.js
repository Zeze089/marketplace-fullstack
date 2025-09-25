"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppDataSource = exports.databaseConfig = void 0;
const typeorm_1 = require("typeorm");
exports.databaseConfig = {
    type: 'postgres',
    host: process.env.DB_HOST || 'localhost',
    port: parseInt(process.env.DB_PORT || '5432'),
    username: process.env.DB_USERNAME || 'postgres',
    password: process.env.DB_PASSWORD || 'postgres123',
    database: process.env.DB_DATABASE || 'marketplace',
    autoLoadEntities: true,
    synchronize: process.env.NODE_ENV === 'development',
    logging: true,
};
exports.AppDataSource = new typeorm_1.DataSource({
    type: 'postgres',
    host: process.env.DB_HOST || 'localhost',
    port: parseInt(process.env.DB_PORT || '5432'),
    username: process.env.DB_USERNAME || 'postgres',
    password: process.env.DB_PASSWORD || 'postgres123',
    database: process.env.DB_DATABASE || 'marketplace',
    entities: ['src/**/*.entity.{ts,js}'],
    migrations: ['src/database/migrations/*.{ts,js}'],
    synchronize: false,
    logging: true,
});
exports.default = exports.AppDataSource;
//# sourceMappingURL=database.config.js.map