import { User } from '../../users/entities/user.entity';
import { CartItem } from './cart-item.entity';
export declare class Cart {
    id: number;
    userId: number;
    user: User;
    items: CartItem[];
    createdAt: Date;
    updatedAt: Date;
    calculateTotal(): number;
    getTotalItems(): number;
    hasProduct(productId: number): boolean;
    findItem(productId: number): CartItem | undefined;
}
