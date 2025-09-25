import { Cart } from './cart.entity';
import { Product } from '../../products/entities/product.entity';
export declare class CartItem {
    id: number;
    cartId: number;
    productId: number;
    quantity: number;
    cart: Cart;
    product: Product;
    createdAt: Date;
    updatedAt: Date;
    getSubtotal(): number;
    isValidQuantity(): boolean;
}
