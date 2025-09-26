// backend/src/modules/auth/decorators/roles.decorator.ts

import { SetMetadata } from '@nestjs/common';
import { UserRole } from '../../users/entities/user.entity';

// Decorator para especificar quais roles podem acessar uma rota
export const Roles = (...roles: UserRole[]) => SetMetadata('roles', roles);