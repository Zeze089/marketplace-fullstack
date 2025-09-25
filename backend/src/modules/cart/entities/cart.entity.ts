// backend/src/modules/cart/entities/cart.entity.ts

import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  OneToOne,
  OneToMany,
  JoinColumn,
} from 'typeorm';
import { User } from '../../users/entities/user.entity';
import { CartItem } from './cart-item.entity'; 

@Entity('carts')
export class Cart {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'int', unique: true })
  userId: number;

  @OneToOne(() => User, (user) => user.cart)
  @JoinColumn({ name: 'userId' })
  user: User;

  // 👈 DESCOMENTAR/ADICIONAR ESTAS LINHAS
  @OneToMany(() => CartItem, (cartItem) => cartItem.cart, { 
    cascade: true,
    eager: true 
  })
  items: CartItem[];

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  
  // Método para calcular total do carrinho
  calculateTotal(): number {
    return this.items.reduce((total, item) => {
      return total + (Number(item.product.price) * item.quantity);
    }, 0);
  }

  // Método para calcular total de itens
  getTotalItems(): number {
    return this.items.reduce((total, item) => total + item.quantity, 0);
  }

  // Método para verificar se produto já existe no carrinho
  hasProduct(productId: number): boolean {
    return this.items.some(item => item.productId === productId);
  }

  // Método para encontrar item específico
  findItem(productId: number): CartItem | undefined {
    return this.items.find(item => item.productId === productId);
  }
}