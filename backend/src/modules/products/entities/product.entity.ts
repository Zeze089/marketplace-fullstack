// backend/src/modules/products/entities/product.entity.ts

import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
} from 'typeorm';
import { CartItem } from '../../cart/entities/cart-item.entity'; 

@Entity('products')
export class Product {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 255 })
  name: string;

  @Column({ type: 'text', nullable: true })
  description: string;

  @Column({ type: 'decimal', precision: 10, scale: 2 })
  price: number;

  @Column({ type: 'int', default: 0 })
  stock: number;

  @Column({ type: 'varchar', length: 500, nullable: true })
  imageUrl: string;

  @Column({ type: 'varchar', length: 100, nullable: true })
  category: string;

  @Column({ type: 'boolean', default: true })
  isActive: boolean;

  @OneToMany(() => CartItem, (cartItem) => cartItem.product)
  cartItems: CartItem[];

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  // Método para verificar disponibilidade em estoque
  hasStock(quantity: number = 1): boolean {
    return this.isActive && this.stock >= quantity;
  }

  // Método para reduzir estoque
  reduceStock(quantity: number): void {
    if (this.stock >= quantity) {
      this.stock -= quantity;
    } else {
      throw new Error('Insufficient stock');
    }
  }

  // Método para aumentar estoque
  increaseStock(quantity: number): void {
    this.stock += quantity;
  }
}