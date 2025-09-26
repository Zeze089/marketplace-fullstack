"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@nestjs/core");
const app_module_1 = require("./app.module");
async function bootstrap() {
    const app = await core_1.NestFactory.create(app_module_1.AppModule);
    app.enableCors({
        origin: ['http://localhost:3000', 'http://localhost:3001', 'http://localhost:3002'],
        credentials: true,
    });
    app.setGlobalPrefix('api/v1');
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
        }
        catch (error) {
            console.log(`❌ Porta ${port} ocupada, tentando próxima...`);
        }
    }
}
bootstrap().catch((error) => {
    console.error('❌ Error starting server:', error);
});
//# sourceMappingURL=main.js.map