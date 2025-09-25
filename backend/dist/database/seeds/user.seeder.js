"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.seedUsers = void 0;
const user_entity_1 = require("../../modules/users/entities/user.entity");
const bcrypt_1 = require("bcrypt");
const seedUsers = async (dataSource) => {
    const userRepository = dataSource.getRepository(user_entity_1.User);
    try {
        const existingUsers = await userRepository.count();
        if (existingUsers > 0) {
            console.log('Users already exist, skipping seed...');
            return;
        }
        const users = [
            {
                name: 'Administrador do Sistema',
                email: 'admin@marketplace.com',
                cpf: '12345678901',
                phone: '85999999999',
                password: await (0, bcrypt_1.hash)('admin123', 12),
                role: user_entity_1.UserRole.ADMIN,
                isActive: true,
                emailVerified: true,
            },
            {
                name: 'João Silva Santos',
                email: 'joao@exemplo.com',
                cpf: '98765432100',
                phone: '85988887777',
                password: await (0, bcrypt_1.hash)('usuario123', 12),
                role: user_entity_1.UserRole.USER,
                isActive: true,
                emailVerified: true,
            },
            {
                name: 'Maria Oliveira Costa',
                email: 'maria@exemplo.com',
                cpf: '11122233344',
                phone: '85977776666',
                password: await (0, bcrypt_1.hash)('usuario123', 12),
                role: user_entity_1.UserRole.USER,
                isActive: true,
                emailVerified: true,
            },
        ];
        await userRepository.save(users);
        console.log('✅ Users seeded successfully');
    }
    catch (error) {
        console.error('❌ Error seeding users:', error);
        throw error;
    }
};
exports.seedUsers = seedUsers;
//# sourceMappingURL=user.seeder.js.map