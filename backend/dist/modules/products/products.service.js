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
exports.ProductsService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const product_entity_1 = require("./entities/product.entity");
let ProductsService = class ProductsService {
    productRepository;
    constructor(productRepository) {
        this.productRepository = productRepository;
    }
    async create(createProductDto) {
        try {
            console.log('Creating product:', createProductDto);
            const product = this.productRepository.create(createProductDto);
            return await this.productRepository.save(product);
        }
        catch (error) {
            console.error('Error creating product:', error);
            throw new common_1.BadRequestException('Erro ao criar produto');
        }
    }
    async findAll(query = {}) {
        try {
            console.log('Finding all products with query:', query);
            const { page = 1, limit = 10, onlyActive = true } = query;
            const whereConditions = onlyActive ? { isActive: true } : {};
            const [products, total] = await this.productRepository.findAndCount({
                where: whereConditions,
                take: limit,
                skip: (page - 1) * limit,
                order: { createdAt: 'DESC' },
            });
            console.log(`Found ${products.length} products out of ${total} total`);
            return {
                data: products,
                meta: {
                    total,
                    page,
                    limit,
                    totalPages: Math.ceil(total / limit),
                },
            };
        }
        catch (error) {
            console.error('Error finding products:', error);
            throw new common_1.BadRequestException(`Erro ao buscar produtos: ${error.message}`);
        }
    }
    async findOne(id) {
        try {
            console.log('Finding product with ID:', id);
            const product = await this.productRepository.findOne({ where: { id } });
            if (!product) {
                throw new common_1.NotFoundException(`Produto com ID ${id} não encontrado`);
            }
            return product;
        }
        catch (error) {
            console.error('Error finding product:', error);
            throw error;
        }
    }
    async update(id, updateProductDto) {
        const product = await this.findOne(id);
        Object.assign(product, updateProductDto);
        return await this.productRepository.save(product);
    }
    async remove(id) {
        const product = await this.findOne(id);
        await this.productRepository.remove(product);
    }
    async checkStock(id, quantity = 1) {
        const product = await this.findOne(id);
        return product.hasStock(quantity);
    }
};
exports.ProductsService = ProductsService;
exports.ProductsService = ProductsService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(product_entity_1.Product)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], ProductsService);
//# sourceMappingURL=products.service.js.map