// backend/src/modules/auth/auth.service.ts

import { Injectable, UnauthorizedException, BadRequestException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from '../users/users.service';
import { User } from '../users/entities/user.entity';
import * as crypto from 'crypto';

// Interfaces para os dados
interface LoginDto {
  email: string;
  password: string;
}

interface RegisterDto {
  name: string;
  email: string;
  cpf: string;
  phone: string;
  password: string;
}

interface JwtPayload {
  sub: number; // ID do usuário
  email: string;
  role: string;
}

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
  ) {}

  // REGISTRO DE USUÁRIO
  async register(registerData: RegisterDto) {
    try {
      // Gerar token de verificação de email
      const emailVerificationToken = crypto.randomBytes(32).toString('hex');

      // Criar usuário no banco
      const user = await this.usersService.create({
        ...registerData,
        emailVerificationToken,
      });

      console.log(`✉️ Token de verificação para ${user.email}: ${emailVerificationToken}`);
      console.log(`🔗 Link de verificação: http://localhost:3001/api/v1/auth/verify-email/${emailVerificationToken}`);

      return {
        message: 'Usuário criado com sucesso! Verifique seu e-mail para ativar a conta.',
        user: user.toSafeObject(),
        // Em produção, enviaria email real
        verificationLink: `http://localhost:3001/api/v1/auth/verify-email/${emailVerificationToken}`
      };
    } catch (error) {
      throw error; // Repassa erros do UsersService (email/CPF duplicado)
    }
  }

  // LOGIN DO USUÁRIO
  async login(loginData: LoginDto) {
    // 1. Buscar usuário pelo email
    const user = await this.usersService.findByEmail(loginData.email);
    if (!user) {
      throw new UnauthorizedException('E-mail ou senha incorretos');
    }

    // 2. Verificar senha
    const isPasswordValid = await user.comparePassword(loginData.password);
    if (!isPasswordValid) {
      throw new UnauthorizedException('E-mail ou senha incorretos');
    }

    // 3. Verificar se conta está ativa
    if (!user.isActive) {
      throw new UnauthorizedException('Conta não ativada. Verifique seu e-mail.');
    }

    // 4. Gerar token JWT
    const payload: JwtPayload = {
      sub: user.id,
      email: user.email,
      role: user.role,
    };

    const access_token = this.jwtService.sign(payload);

    return {
      message: 'Login realizado com sucesso',
      user: user.toSafeObject(),
      access_token,
      token_type: 'Bearer',
      expires_in: '24h',
    };
  }

  // VERIFICAR EMAIL
  async verifyEmail(token: string) {
    // Buscar usuário pelo token
    const user = await this.usersService.findByVerificationToken(token);
    if (!user) {
      throw new BadRequestException('Token de verificação inválido ou expirado');
    }

    // Ativar usuário
    await this.usersService.activateUser(user.id);

    return {
      message: 'E-mail verificado com sucesso! Sua conta está ativa.',
      user: user.toSafeObject(),
    };
  }

  // VALIDAR USUÁRIO (usado pelo JWT Strategy)
  async validateUser(payload: JwtPayload): Promise<any> {
    const user = await this.usersService.findById(payload.sub);
    if (!user) {
      throw new UnauthorizedException('Token inválido');
    }

    return user; // Vai para request.user
  }

  // OBTER PERFIL DO USUÁRIO LOGADO
  async getProfile(userId: number) {
    const user = await this.usersService.findById(userId);
    if (!user) {
      throw new UnauthorizedException('Usuário não encontrado');
    }

    return {
      message: 'Perfil carregado com sucesso',
      user,
    };
  }

  // VALIDAR LOGIN SIMPLES (para strategy local)
  async validateUserCredentials(email: string, password: string): Promise<any> {
    const user = await this.usersService.findByEmail(email);
    
    if (user && await user.comparePassword(password) && user.isActive) {
      return user.toSafeObject();
    }
    
    return null;
  }
}