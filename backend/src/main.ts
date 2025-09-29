import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  
  // CORS configurado para aceitar produção e desenvolvimento
  app.enableCors({
    origin: [
      'http://localhost:3000',
      /\.vercel\.app$/, // Aceita qualquer subdomínio vercel.app
    ],
    credentials: true,
  });
  
  app.setGlobalPrefix('api/v1');
  
  const port = process.env.PORT || 3001;
  await app.listen(port);
  
  console.log(`🚀 Backend rodando na porta ${port}`);
}

bootstrap();