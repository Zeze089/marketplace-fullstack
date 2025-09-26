// backend/src/modules/auth/strategies/jwt.strategy.ts

import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { AuthService } from '../auth.service';

// Interface do payload do JWT
interface JwtPayload {
  sub: number;
  email: string;
  role: string;
  iat?: number;
  exp?: number;
}

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    private configService: ConfigService,
    private authService: AuthService,
  ) {
    super({
      // De onde extrair o token (Authorization: Bearer TOKEN)
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      
      // Não ignorar expiração do token
      ignoreExpiration: false,
      
      // Chave secreta para validar token
      secretOrKey: configService.get<string>('JWT_SECRET') || 'fallback-secret-key',
    });
  }

  // Este método é executado automaticamente quando um token JWT é validado
  async validate(payload: JwtPayload) {
    try {
      // Buscar usuário pelo ID do token
      const user = await this.authService.validateUser(payload);
      
      if (!user) {
        throw new UnauthorizedException('Token inválido - usuário não encontrado');
      }

      // Este objeto vai para request.user em rotas protegidas
      return {
        id: payload.sub,
        email: payload.email,
        role: payload.role,
        ...user,
      };
      
    } catch (error) {
      throw new UnauthorizedException('Token inválido');
    }
  }
}