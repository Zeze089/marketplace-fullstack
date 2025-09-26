// backend/src/modules/auth/guards/role.guard.ts

import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { UserRole } from '../../users/entities/user.entity';

@Injectable()
export class RoleGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    // Pegar roles necessárias do decorator @Roles()
    const requiredRoles = this.reflector.getAllAndOverride<UserRole[]>('roles', [
      context.getHandler(),
      context.getClass(),
    ]);

    // Se não tem roles definidas, permite acesso
    if (!requiredRoles) {
      return true;
    }

    // Pegar usuário da request (colocado pelo JwtAuthGuard)
    const { user } = context.switchToHttp().getRequest();

    // Verificar se usuário existe
    if (!user) {
      return false;
    }

    // Verificar se o usuário tem alguma das roles necessárias
    return requiredRoles.some((role) => user.role === role);
  }
}