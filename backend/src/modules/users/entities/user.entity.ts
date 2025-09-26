// backend/src/modules/users/entities/user.entity.ts

import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  OneToOne,
  BeforeInsert,
  BeforeUpdate,
} from 'typeorm';
import { Exclude } from 'class-transformer';
import { hash, compare } from 'bcrypt';
import { Cart } from '../../cart/entities/cart.entity';

export enum UserRole {
  USER = 'USER',
  ADMIN = 'ADMIN',
}

@Entity('users')
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 255 })
  name: string;

  @Column({ type: 'varchar', length: 255, unique: true })
  email: string;

  @Column({ type: 'varchar', length: 14, unique: true })
  cpf: string;

  @Column({ type: 'varchar', length: 15 })
  phone: string;

  @Column({ type: 'varchar', length: 255 })
  @Exclude()
  password: string;

  @Column({
    type: 'enum',
    enum: UserRole,
    default: UserRole.USER,
  })
  role: UserRole;

  @Column({ type: 'boolean', default: false })
  isActive: boolean;

  @Column({ type: 'boolean', default: false })
  emailVerified: boolean;

  @Column({ type: 'varchar', length: 255, nullable: true, default: null })
  @Exclude()
  emailVerificationToken: string | null;

  @Column({ type: 'varchar', length: 255, nullable: true, default: null })
  @Exclude()
  passwordResetToken: string | null;

  @Column({ type: 'timestamp', nullable: true, default: null })
  passwordResetExpires: Date | null;

  @OneToOne(() => Cart, (cart) => cart.user)
  cart: Cart;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @BeforeInsert()
  @BeforeUpdate()
  async hashPassword() {
    if (this.password) {
      const saltRounds = 12;
      this.password = await hash(this.password, saltRounds);
    }
  }

  async comparePassword(plainPassword: string): Promise<boolean> {
    return compare(plainPassword, this.password);
  }

  // Método para limpar dados sensíveis
  toSafeObject() {
    const { password, emailVerificationToken, passwordResetToken, ...safeUser } = this;
    return safeUser;
  }
}