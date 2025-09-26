// backend/src/database/seeds/run-seeds.ts

import { NestFactory } from '@nestjs/core';
import { AppModule } from '../../app.module';
import { SeedsService } from './seeds.service';

async function runSeeds() {
  console.log('🌱 Iniciando aplicação para executar seeds...');
  
  const app = await NestFactory.createApplicationContext(AppModule);
  const seedsService = app.get(SeedsService);

  try {
    await seedsService.runAllSeeds();
    console.log('✅ Seeds executados com sucesso!');
  } catch (error) {
    console.error('❌ Erro ao executar seeds:', error);
    process.exit(1);
  } finally {
    await app.close();
  }
}

runSeeds();