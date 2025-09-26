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
exports.CartService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const user_entity_1 = require("../users/entities/user.entity");
const product_entity_1 = require("../products/entities/product.entity");
let CartService = class CartService {
    userRepository;
    productRepository;
    constructor(userRepository, productRepository) {
        this.userRepository = userRepository;
        this.productRepository = productRepository;
    }
    carts = new Map();
    async addItem(userId, productId, quantity = 1) {
        const product = await this.productRepository.findOne({
            where: { id: productId, isActive: true },
        });
        if (!product) {
            throw new common_1.NotFoundException('Produto não encontrado ou inativo');
        }
        if (!product.hasStock(quantity)) {
            throw new common_1.BadRequestException(`Estoque insuficiente. Disponível: ${product.stock}`);
        }
        let userCart = this.carts.get(userId) || [];
        const existingItemIndex = userCart.findIndex(item => item.productId === productId);
        if (existingItemIndex >= 0) {
            userCart[existingItemIndex].quantity += quantity;
        }
        else {
            const newItem = {
                id: Date.now(),
                cartId: userId,
                productId,
                quantity,
                product,
            };
            userCart.push(newItem);
        }
        this.carts.set(userId, userCart);
        return this.getCart(userId);
    }
    async getCart(userId) {
        const userCart = this.carts.get(userId) || [];
        const cartWithProducts = await Promise.all(userCart.map(async (item) => {
            const product = await this.productRepository.findOne({
                where: { id: item.productId },
            });
            return {
                id: item.id,
                quantity: item.quantity,
                subtotal: Number(product?.price || 0) * item.quantity,
                product: {
                    id: product?.id,
                    name: product?.name,
                    price: product?.price,
                    stock: product?.stock,
                    imageUrl: product?.imageUrl,
                    category: product?.category,
                },
            };
        }));
        const totalPrice = cartWithProducts.reduce((sum, item) => sum + item.subtotal, 0);
        const totalItems = cartWithProducts.reduce((sum, item) => sum + item.quantity, 0);
        return {
            cart: {
                userId,
                itemCount: cartWithProducts.length,
            },
            items: cartWithProducts,
            summary: {
                totalItems,
                totalPrice,
                itemCount: cartWithProducts.length,
            },
        };
    }
    async removeItem(userId, productId) {
        let userCart = this.carts.get(userId) || [];
        userCart = userCart.filter(item => item.productId !== productId);
        this.carts.set(userId, userCart);
        return this.getCart(userId);
    }
    async clearCart(userId) {
        this.carts.delete(userId);
        return {
            message: 'Carrinho limpo com sucesso',
            cart: await this.getCart(userId),
        };
    }
};
exports.CartService = CartService;
exports.CartService = CartService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(user_entity_1.User)),
    __param(1, (0, typeorm_1.InjectRepository)(product_entity_1.Product)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository])
], CartService);
//# sourceMappingURL=cart.service.js.map