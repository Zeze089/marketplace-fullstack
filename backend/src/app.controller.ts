// backend/src/app.controller.ts

import { Controller, Get } from '@nestjs/common';

@Controller()
export class AppController {
  @Get()
  getHello(): string {
    return 'A API do Marketplace está em execução! 🚀';
  }

  @Get('health')
  getHealth() {
    return {
      status: 'OK',
      message: 'Marketplace API is healthy',
      timestamp: new Date().toISOString(),
      uptime: process.uptime(),
    };
  }
}