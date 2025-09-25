import { Cart } from '../../cart/entities/cart.entity';
export declare enum UserRole {
    USER = "USER",
    ADMIN = "ADMIN"
}
export declare class User {
    id: number;
    name: string;
    email: string;
    cpf: string;
    phone: string;
    password: string;
    role: UserRole;
    isActive: boolean;
    emailVerified: boolean;
    emailVerificationToken: string;
    passwordResetToken: string;
    passwordResetExpires: Date;
    cart: Cart;
    createdAt: Date;
    updatedAt: Date;
    hashPassword(): Promise<void>;
    comparePassword(plainPassword: string): Promise<boolean>;
    toSafeObject(): Omit<this, "password" | "emailVerificationToken" | "passwordResetToken" | "hashPassword" | "comparePassword" | "toSafeObject">;
}
