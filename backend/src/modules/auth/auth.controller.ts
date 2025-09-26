// backend/src/modules/auth/auth.controller.ts

import {
  Controller,
  Post,
  Get,
  Body,
  Param,
  HttpStatus,
  UseGuards,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { JwtAuthGuard } from './guards/jwt-auth.guard';
import { Public } from './decorators/public.decorator';
import { CurrentUser } from './decorators/current-user.decorator';

// Interfaces simples para os dados
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

@Controller('auth')
@UseGuards(JwtAuthGuard) // Proteção padrão - todas rotas precisam de token
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  // REGISTRO DE USUÁRIO (público)
  @Post('register')
  @Public() // Não precisa de token
  async register(@Body() registerDto: RegisterDto) {
    const result = await this.authService.register(registerDto);
    return {
      statusCode: HttpStatus.CREATED,
      ...result,
    };
  }

  // LOGIN DE USUÁRIO (público)
  @Post('login')
  @Public() // Não precisa de token
  async login(@Body() loginDto: LoginDto) {
    const result = await this.authService.login(loginDto);
    return {
      statusCode: HttpStatus.OK,
      ...result,
    };
  }

  // VERIFICAR EMAIL (público)
  @Get('verify-email/:token')
  @Public() // Não precisa de token
  async verifyEmail(@Param('token') token: string) {
    const result = await this.authService.verifyEmail(token);
    return {
      statusCode: HttpStatus.OK,
      ...result,
    };
  }

  // PERFIL DO USUÁRIO LOGADO (protegido)
  @Get('profile')
  async getProfile(@CurrentUser() user: any) {
    return {
      statusCode: HttpStatus.OK,
      message: 'Perfil carregado com sucesso',
      user: user,
    };
  }

  // TESTE SE TOKEN ESTÁ VÁLIDO (protegido)
  @Get('me')
  async getCurrentUser(@CurrentUser() user: any) {
    return {
      statusCode: HttpStatus.OK,
      message: 'Token válido',
      user: user,
    };
  }

  // LOGOUT (protegido) - apenas retorna mensagem, o frontend remove o token
  @Post('logout')
  async logout() {
    return {
      statusCode: HttpStatus.OK,
      message: 'Logout realizado com sucesso',
    };
  }
}