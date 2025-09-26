import { HttpStatus } from '@nestjs/common';
import { CartService } from './cart.service';
interface AddToCartDto {
    productId: number;
    quantity: number;
}
export declare class CartController {
    private readonly cartService;
    constructor(cartService: CartService);
    addToCart(user: any, addToCartDto: AddToCartDto): Promise<{
        statusCode: HttpStatus;
        message: string;
        data: {
            cart: {
                userId: number;
                itemCount: number;
            };
            items: {
                id: number;
                quantity: number;
                subtotal: number;
                product: {
                    id: number | undefined;
                    name: string | undefined;
                    price: number | undefined;
                    stock: number | undefined;
                    imageUrl: string | undefined;
                    category: string | undefined;
                };
            }[];
            summary: {
                totalItems: number;
                totalPrice: number;
                itemCount: number;
            };
        };
    }>;
    getCart(user: any): Promise<{
        statusCode: HttpStatus;
        message: string;
        data: {
            cart: {
                userId: number;
                itemCount: number;
            };
            items: {
                id: number;
                quantity: number;
                subtotal: number;
                product: {
                    id: number | undefined;
                    name: string | undefined;
                    price: number | undefined;
                    stock: number | undefined;
                    imageUrl: string | undefined;
                    category: string | undefined;
                };
            }[];
            summary: {
                totalItems: number;
                totalPrice: number;
                itemCount: number;
            };
        };
    }>;
    removeFromCart(user: any, productId: number): Promise<{
        statusCode: HttpStatus;
        message: string;
        data: {
            cart: {
                userId: number;
                itemCount: number;
            };
            items: {
                id: number;
                quantity: number;
                subtotal: number;
                product: {
                    id: number | undefined;
                    name: string | undefined;
                    price: number | undefined;
                    stock: number | undefined;
                    imageUrl: string | undefined;
                    category: string | undefined;
                };
            }[];
            summary: {
                totalItems: number;
                totalPrice: number;
                itemCount: number;
            };
        };
    }>;
    clearCart(user: any): Promise<{
        statusCode: HttpStatus;
        message: string;
        data: {
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
                        id: number | undefined;
                        name: string | undefined;
                        price: number | undefined;
                        stock: number | undefined;
                        imageUrl: string | undefined;
                        category: string | undefined;
                    };
                }[];
                summary: {
                    totalItems: number;
                    totalPrice: number;
                    itemCount: number;
                };
            };
        };
    }>;
    updateQuantity(user: any, updateDto: {
        productId: number;
        quantity: number;
    }): Promise<{
        statusCode: HttpStatus;
        message: string;
        data: {
            cart: {
                userId: number;
                itemCount: number;
            };
            items: {
                id: number;
                quantity: number;
                subtotal: number;
                product: {
                    id: number | undefined;
                    name: string | undefined;
                    price: number | undefined;
                    stock: number | undefined;
                    imageUrl: string | undefined;
                    category: string | undefined;
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
export {};
