import { Repository } from 'typeorm';
import { User } from '../users/entities/user.entity';
import { Product } from '../products/entities/product.entity';
export declare class CartService {
    private readonly userRepository;
    private readonly productRepository;
    constructor(userRepository: Repository<User>, productRepository: Repository<Product>);
    private carts;
    addItem(userId: number, productId: number, quantity?: number): Promise<{
        cart: {
            userId: number;
            itemCount: number;
        };
        items: {
            id: number;
            quantity: number;
            subtotal: number;
            product: {
                id: any;
                name: any;
                price: any;
                stock: any;
                imageUrl: any;
                category: any;
            };
        }[];
        summary: {
            totalItems: number;
            totalPrice: number;
            itemCount: number;
        };
    }>;
    getCart(userId: number): Promise<{
        cart: {
            userId: number;
            itemCount: number;
        };
        items: {
            id: number;
            quantity: number;
            subtotal: number;
            product: {
                id: any;
                name: any;
                price: any;
                stock: any;
                imageUrl: any;
                category: any;
            };
        }[];
        summary: {
            totalItems: number;
            totalPrice: number;
            itemCount: number;
        };
    }>;
    removeItem(userId: number, productId: number): Promise<{
        cart: {
            userId: number;
            itemCount: number;
        };
        items: {
            id: number;
            quantity: number;
            subtotal: number;
            product: {
                id: any;
                name: any;
                price: any;
                stock: any;
                imageUrl: any;
                category: any;
            };
        }[];
        summary: {
            totalItems: number;
            totalPrice: number;
            itemCount: number;
        };
    }>;
    clearCart(userId: number): Promise<{
        message: string;
        cart: {
            cart: {
                userId: number;
                itemCount: number;
            };
            items: {
                id: number;
                quantity: number;
                subtotal: number;
                product: {
                    id: any;
                    name: any;
                    price: any;
                    stock: any;
                    imageUrl: any;
                    category: any;
                };
            }[];
            summary: {
                totalItems: number;
                totalPrice: number;
                itemCount: number;
            };
        };
    }>;
}
