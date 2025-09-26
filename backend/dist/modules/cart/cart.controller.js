"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CartController = void 0;
const common_1 = require("@nestjs/common");
const cart_service_1 = require("./cart.service");
const jwt_auth_guard_1 = require("../auth/guards/jwt-auth.guard");
const current_user_decorator_1 = require("../auth/decorators/current-user.decorator");
let CartController = class CartController {
    cartService;
    constructor(cartService) {
        this.cartService = cartService;
    }
    async addToCart(user, addToCartDto) {
        const { productId, quantity } = addToCartDto;
        const result = await this.cartService.addItem(user.id, productId, quantity);
        return {
            statusCode: common_1.HttpStatus.OK,
            message: 'Produto adicionado ao carrinho com sucesso',
            data: result,
        };
    }
    async getCart(user) {
        const result = await this.cartService.getCart(user.id);
        return {
            statusCode: common_1.HttpStatus.OK,
            message: 'Carrinho carregado com sucesso',
            data: result,
        };
    }
    async removeFromCart(user, productId) {
        const result = await this.cartService.removeItem(user.id, productId);
        return {
            statusCode: common_1.HttpStatus.OK,
            message: 'Produto removido do carrinho com sucesso',
            data: result,
        };
    }
    async clearCart(user) {
        const result = await this.cartService.clearCart(user.id);
        return {
            statusCode: common_1.HttpStatus.OK,
            message: 'Carrinho limpo com sucesso',
            data: result,
        };
    }
    async updateQuantity(user, updateDto) {
        const { productId, quantity } = updateDto;
        await this.cartService.removeItem(user.id, productId);
        if (quantity > 0) {
            const result = await this.cartService.addItem(user.id, productId, quantity);
            return {
                statusCode: common_1.HttpStatus.OK,
                message: 'Quantidade atualizada com sucesso',
                data: result,
            };
        }
        else {
            const result = await this.cartService.getCart(user.id);
            return {
                statusCode: common_1.HttpStatus.OK,
                message: 'Produto removido do carrinho',
                data: result,
            };
        }
    }
};
exports.CartController = CartController;
__decorate([
    (0, common_1.Post)('add'),
    __param(0, (0, current_user_decorator_1.CurrentUser)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], CartController.prototype, "addToCart", null);
__decorate([
    (0, common_1.Get)(),
    __param(0, (0, current_user_decorator_1.CurrentUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], CartController.prototype, "getCart", null);
__decorate([
    (0, common_1.Delete)('remove/:productId'),
    __param(0, (0, current_user_decorator_1.CurrentUser)()),
    __param(1, (0, common_1.Param)('productId', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Number]),
    __metadata("design:returntype", Promise)
], CartController.prototype, "removeFromCart", null);
__decorate([
    (0, common_1.Delete)('clear'),
    __param(0, (0, current_user_decorator_1.CurrentUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], CartController.prototype, "clearCart", null);
__decorate([
    (0, common_1.Post)('update'),
    __param(0, (0, current_user_decorator_1.CurrentUser)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], CartController.prototype, "updateQuantity", null);
exports.CartController = CartController = __decorate([
    (0, common_1.Controller)('cart'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    __metadata("design:paramtypes", [cart_service_1.CartService])
], CartController);
//# sourceMappingURL=cart.controller.js.map