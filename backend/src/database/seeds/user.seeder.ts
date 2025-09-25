// backend/src/database/seeds/user.seeder.ts

import { DataSource } from 'typeorm';
import { User, UserRole } from '../../modules/users/entities/user.entity';
import { hash } from 'bcrypt'; // 👈 MUDANÇA: import direto da função hash

export const seedUsers = async (dataSource: DataSource): Promise<void> => {
  const userRepository = dataSource.getRepository(User);

  try {
    // Verificar se já existem usuários
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
        password: await hash('admin123', 12), // 👈 MUDANÇA: usar hash diretamente
        role: UserRole.ADMIN,
        isActive: true,
        emailVerified: true,
      },
      {
        name: 'João Silva Santos',
        email: 'joao@exemplo.com',
        cpf: '98765432100',
        phone: '85988887777',
        password: await hash('usuario123', 12), // 👈 MUDANÇA: usar hash diretamente
        role: UserRole.USER,
        isActive: true,
        emailVerified: true,
      },
      {
        name: 'Maria Oliveira Costa',
        email: 'maria@exemplo.com',
        cpf: '11122233344',
        phone: '85977776666',
        password: await hash('usuario123', 12), // 👈 MUDANÇA: usar hash diretamente
        role: UserRole.USER,
        isActive: true,
        emailVerified: true,
      },
    ];

    await userRepository.save(users);
    console.log('✅ Users seeded successfully');
  } catch (error) {
    console.error('❌ Error seeding users:', error);
    throw error;
  }
};