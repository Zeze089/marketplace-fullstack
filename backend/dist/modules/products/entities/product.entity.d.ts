import { CartItem } from '../../cart/entities/cart-item.entity';
export declare class Product {
    id: number;
    name: string;
    description: string;
    price: number;
    stock: number;
    imageUrl: string;
    category: string;
    isActive: boolean;
    cartItems: CartItem[];
    createdAt: Date;
    updatedAt: Date;
    hasStock(quantity?: number): boolean;
    reduceStock(quantity: number): void;
    increaseStock(quantity: number): void;
}
