// backend/src/modules/cart/entities/cart-item.entity.ts

import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Cart } from './cart.entity';
import { Product } from '../../products/entities/product.entity';

@Entity('cart_items')
export class CartItem {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'int' })
  cartId: number;

  @Column({ type: 'int' })
  productId: number;

  @Column({ type: 'int', default: 1 })
  quantity: number;

  @ManyToOne(() => Cart, (cart) => cart.items, { 
    onDelete: 'CASCADE' 
  })
  @JoinColumn({ name: 'cartId' })
  cart: Cart;

  @ManyToOne(() => Product, (product) => product.cartItems, { 
    eager: true 
  })
  @JoinColumn({ name: 'productId' })
  product: Product;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  // Método para calcular subtotal do item
  getSubtotal(): number {
    return Number(this.product.price) * this.quantity;
  }

  // Método para validar quantidade
  isValidQuantity(): boolean {
    return this.quantity > 0 && this.quantity <= this.product.stock;
  }
}