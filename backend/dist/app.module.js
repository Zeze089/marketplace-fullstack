"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppModule = void 0;
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
const typeorm_1 = require("@nestjs/typeorm");
const database_config_1 = require("./config/database.config");
const user_entity_1 = require("./modules/users/entities/user.entity");
const product_entity_1 = require("./modules/products/entities/product.entity");
const cart_entity_1 = require("./modules/cart/entities/cart.entity");
const cart_item_entity_1 = require("./modules/cart/entities/cart-item.entity");
const auth_module_1 = require("./modules/auth/auth.module");
const app_controller_1 = require("./app.controller");
let AppModule = class AppModule {
};
exports.AppModule = AppModule;
exports.AppModule = AppModule = __decorate([
    (0, common_1.Module)({
        imports: [
            config_1.ConfigModule.forRoot({
                isGlobal: true,
                envFilePath: '.env',
            }),
            typeorm_1.TypeOrmModule.forRoot({
                ...database_config_1.databaseConfig,
                entities: [user_entity_1.User, product_entity_1.Product, cart_entity_1.Cart, cart_item_entity_1.CartItem],
            }),
            typeorm_1.TypeOrmModule.forFeature([user_entity_1.User, product_entity_1.Product, cart_entity_1.Cart, cart_item_entity_1.CartItem]),
            auth_module_1.AuthModule,
        ],
        controllers: [app_controller_1.AppController],
        providers: [],
    })
], AppModule);
//# sourceMappingURL=app.module.js.map