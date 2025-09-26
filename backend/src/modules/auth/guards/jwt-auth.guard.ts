// backend/src/modules/auth/guards/jwt-auth.guard.ts

import { Injectable, ExecutionContext, UnauthorizedException } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Reflector } from '@nestjs/core';

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {
  constructor(private reflector: Reflector) {
    super();
  }

  canActivate(context: ExecutionContext) {
    // Verifica se a rota é pública (não precisa de autenticação)
    const isPublic = this.reflector.get<boolean>('isPublic', context.getHandler());
    if (isPublic) {
      return true; // Permite acesso sem token
    }

    // Se não é pública, verifica o token JWT
    return super.canActivate(context);
  }

  handleRequest(err: any, user: any, info: any) {
    // Se houve erro ou usuário não encontrado, bloqueia acesso
    if (err || !user) {
      throw err || new UnauthorizedException('Token de acesso necessário');
    }
    return user;
  }
}