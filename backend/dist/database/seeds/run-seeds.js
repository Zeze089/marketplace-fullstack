"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@nestjs/core");
const app_module_1 = require("../../app.module");
const seeds_service_1 = require("./seeds.service");
async function runSeeds() {
    console.log('🌱 Iniciando aplicação para executar seeds...');
    const app = await core_1.NestFactory.createApplicationContext(app_module_1.AppModule);
    const seedsService = app.get(seeds_service_1.SeedsService);
    try {
        await seedsService.runAllSeeds();
        console.log('✅ Seeds executados com sucesso!');
    }
    catch (error) {
        console.error('❌ Erro ao executar seeds:', error);
        process.exit(1);
    }
    finally {
        await app.close();
    }
}
runSeeds();
//# sourceMappingURL=run-seeds.js.map