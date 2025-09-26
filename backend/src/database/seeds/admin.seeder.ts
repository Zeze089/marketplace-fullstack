// backend/src/database/seeds/admin.seeder.ts

import { DataSource } from 'typeorm';
import { User, UserRole } from '../../modules/users/entities/user.entity';
import { hash } from 'bcrypt';

// Configuração direta do banco (sem import do config)
const AppDataSource = new DataSource({
  type: 'postgres',
  host: 'localhost',
  port: 5432,
  username: 'postgres',
  password: 'postgres123',
  database: 'marketplace',
  entities: [User],
  synchronize: false,
});

export const seedAdmin = async (): Promise<void> => {
  try {
    // Conectar ao banco
    await AppDataSource.initialize();
    
    const userRepository = AppDataSource.getRepository(User);

    // Verificar se admin já existe
    const existingAdmin = await userRepository.findOne({
      where: { email: 'admin@marketplace.com' }
    });

    if (existingAdmin) {
      console.log('Admin já existe, pulando...');
      return;
    }

    // Criar admin ativo
    const adminUser = userRepository.create({
      name: 'Administrador do Sistema',
      email: 'admin@marketplace.com',
      cpf: '00000000000',
      phone: '85999999999',
      password: await hash('admin123', 12),
      role: UserRole.ADMIN,
      isActive: true,
      emailVerified: true,
      emailVerificationToken: null,
    });

    await userRepository.save(adminUser);

    console.log('✅ ADMIN CRIADO COM SUCESSO!');
    console.log('📧 Email: admin@marketplace.com');
    console.log('🔑 Senha: admin123');
    console.log('👤 Role: ADMIN');

  } catch (error) {
    console.error('❌ Erro ao criar admin:', error);
  } finally {
    // Fechar conexão
    if (AppDataSource.isInitialized) {
      await AppDataSource.destroy();
    }
  }
};

// Executar seed
seedAdmin();