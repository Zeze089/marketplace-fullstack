// backend/src/modules/auth/decorators/public.decorator.ts

import { SetMetadata } from '@nestjs/common';

// Decorator para marcar rotas como públicas (não precisam de autenticação)
export const Public = () => SetMetadata('isPublic', true);