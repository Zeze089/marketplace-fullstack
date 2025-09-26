import { HttpStatus } from '@nestjs/common';
import { ProductsService } from './products.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
export declare class ProductsController {
    private readonly productsService;
    constructor(productsService: ProductsService);
    create(createProductDto: CreateProductDto): Promise<{
        statusCode: HttpStatus;
        message: string;
        data: import("./entities/product.entity").Product;
    }>;
    findAll(page?: string, limit?: string, category?: string, search?: string, minPrice?: string, maxPrice?: string, onlyActive?: string): Promise<any>;
    checkStock(id: number, quantity: number): Promise<{
        statusCode: HttpStatus;
        message: string;
        data: {
            available: boolean;
            productId: number;
            requestedQuantity: number;
        };
    }>;
    findOne(id: number): Promise<{
        statusCode: HttpStatus;
        message: string;
        data: import("./entities/product.entity").Product;
    }>;
    update(id: number, updateProductDto: UpdateProductDto): Promise<{
        statusCode: HttpStatus;
        message: string;
        data: import("./entities/product.entity").Product;
    }>;
    remove(id: number): Promise<{
        statusCode: HttpStatus;
        message: string;
    }>;
}
