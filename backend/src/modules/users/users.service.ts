// backend/src/modules/users/users.service.ts

import { Injectable, ConflictException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  // Criar usuário (registro)
  async create(userData: {
    name: string;
    email: string;
    cpf: string;
    phone: string;
    password: string;
    emailVerificationToken?: string;
  }): Promise<User> {
    // Verificar se email já existe
    const existingEmail = await this.userRepository.findOne({
      where: { email: userData.email }
    });
    if (existingEmail) {
      throw new ConflictException('E-mail já cadastrado no sistema');
    }

    // Verificar se CPF já existe
    const existingCpf = await this.userRepository.findOne({
      where: { cpf: userData.cpf }
    });
    if (existingCpf) {
      throw new ConflictException('CPF já cadastrado no sistema');
    }

    // Criar usuário
    const user = this.userRepository.create({
      ...userData,
      emailVerificationToken: userData.emailVerificationToken || null,
    });
    return await this.userRepository.save(user);
  }

  // Buscar por email (para login)
  async findByEmail(email: string): Promise<User | null> {
    return await this.userRepository.findOne({ 
      where: { email } 
    });
  }

  // Buscar por CPF
  async findByCpf(cpf: string): Promise<User | null> {
    return await this.userRepository.findOne({ 
      where: { cpf } 
    });
  }

  // Buscar por ID
  async findById(id: number): Promise<User | null> {
    const user = await this.userRepository.findOne({ 
      where: { id } 
    });
    return user || null;
  }

  // Buscar por token de verificação
  async findByVerificationToken(token: string): Promise<User | null> {
    return await this.userRepository.findOne({ 
      where: { emailVerificationToken: token } 
    });
  }

  // Ativar usuário após verificação de email
  async activateUser(userId: number): Promise<void> {
    await this.userRepository.update(userId, {
      isActive: true,
      emailVerified: true,
      emailVerificationToken: null,
    });
  }
}