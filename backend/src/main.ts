// backend/src/main.ts

import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // CORS para desenvolvimento
  app.enableCors({
    origin: ['http://localhost:3000', 'http://localhost:3001', 'http://localhost:3002'],
    credentials: true,
  });

  // Global prefix
  app.setGlobalPrefix('api/v1');

  // Global validation
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
    }),
  );

  // Tentar portas diferentes
  const ports = [3001, 3002, 3003, 3004];
  let server;
  
  for (const port of ports) {
    try {
      server = await app.listen(port);
      console.log(`
  🚀 Marketplace API is running!
  🌐 API: http://localhost:${port}/api/v1  
  🏥 Health: http://localhost:${port}/api/v1/health
  🔒 Environment: ${process.env.NODE_ENV || 'development'}
      `);
      break;
    } catch (error) {
      console.log(`❌ Porta ${port} ocupada, tentando próxima...`);
    }
  }
}

bootstrap().catch((error) => {
  console.error('❌ Error starting server:', error);
});