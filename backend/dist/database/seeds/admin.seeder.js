"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.seedAdmin = void 0;
const typeorm_1 = require("typeorm");
const user_entity_1 = require("../../modules/users/entities/user.entity");
const bcrypt_1 = require("bcrypt");
const AppDataSource = new typeorm_1.DataSource({
    type: 'postgres',
    host: 'localhost',
    port: 5432,
    username: 'postgres',
    password: 'postgres123',
    database: 'marketplace',
    entities: [user_entity_1.User],
    synchronize: false,
});
const seedAdmin = async () => {
    try {
        await AppDataSource.initialize();
        const userRepository = AppDataSource.getRepository(user_entity_1.User);
        const existingAdmin = await userRepository.findOne({
            where: { email: 'admin@marketplace.com' }
        });
        if (existingAdmin) {
            console.log('Admin já existe, pulando...');
            return;
        }
        const adminUser = userRepository.create({
            name: 'Administrador do Sistema',
            email: 'admin@marketplace.com',
            cpf: '00000000000',
            phone: '85999999999',
            password: await (0, bcrypt_1.hash)('admin123', 12),
            role: user_entity_1.UserRole.ADMIN,
            isActive: true,
            emailVerified: true,
            emailVerificationToken: null,
        });
        await userRepository.save(adminUser);
        console.log('✅ ADMIN CRIADO COM SUCESSO!');
        console.log('📧 Email: admin@marketplace.com');
        console.log('🔑 Senha: admin123');
        console.log('👤 Role: ADMIN');
    }
    catch (error) {
        console.error('❌ Erro ao criar admin:', error);
    }
    finally {
        if (AppDataSource.isInitialized) {
            await AppDataSource.destroy();
        }
    }
};
exports.seedAdmin = seedAdmin;
(0, exports.seedAdmin)();
//# sourceMappingURL=admin.seeder.js.map