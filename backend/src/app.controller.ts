// backend/src/app.controller.ts

import { Controller, Get } from '@nestjs/common';

@Controller()
export class AppController {
  @Get()
  getHello(): string {
    return 'Marketplace API is running! 🚀';
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