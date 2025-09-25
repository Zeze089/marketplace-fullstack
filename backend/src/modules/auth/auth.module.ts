// backend/src/modules/auth/auth.module.ts

import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';

// Importar apenas a entidade User
import { User } from '../users/entities/user.entity';

@Module({
  imports: [
    PassportModule.register({ defaultStrategy: 'jwt' }),
    
    JwtModule.registerAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        secret: configService.get<string>('JWT_SECRET') || 'fallback-secret-key',
        signOptions: {
          expiresIn: configService.get<string>('JWT_EXPIRATION') || '24h',
        },
      }),
      inject: [ConfigService],
    }),

    TypeOrmModule.forFeature([User]),
  ],
  controllers: [
    // Sem controllers por enquanto
  ],
  providers: [
    // Sem providers por enquanto
  ],
  exports: [
    JwtModule,
    PassportModule,
  ],
})
export class AuthModule {}