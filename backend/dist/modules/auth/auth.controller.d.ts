import { HttpStatus } from '@nestjs/common';
import { AuthService } from './auth.service';
interface LoginDto {
    email: string;
    password: string;
}
interface RegisterDto {
    name: string;
    email: string;
    cpf: string;
    phone: string;
    password: string;
}
export declare class AuthController {
    private readonly authService;
    constructor(authService: AuthService);
    register(registerDto: RegisterDto): Promise<{
        message: string;
        user: Omit<import("../users/entities/user.entity").User, "password" | "emailVerificationToken" | "passwordResetToken" | "hashPassword" | "comparePassword" | "toSafeObject">;
        verificationLink: string;
        statusCode: HttpStatus;
    }>;
    login(loginDto: LoginDto): Promise<{
        message: string;
        user: Omit<import("../users/entities/user.entity").User, "password" | "emailVerificationToken" | "passwordResetToken" | "hashPassword" | "comparePassword" | "toSafeObject">;
        access_token: string;
        token_type: string;
        expires_in: string;
        statusCode: HttpStatus;
    }>;
    verifyEmail(token: string): Promise<{
        message: string;
        user: Omit<import("../users/entities/user.entity").User, "password" | "emailVerificationToken" | "passwordResetToken" | "hashPassword" | "comparePassword" | "toSafeObject">;
        statusCode: HttpStatus;
    }>;
    getProfile(user: any): Promise<{
        statusCode: HttpStatus;
        message: string;
        user: any;
    }>;
    getCurrentUser(user: any): Promise<{
        statusCode: HttpStatus;
        message: string;
        user: any;
    }>;
    logout(): Promise<{
        statusCode: HttpStatus;
        message: string;
    }>;
}
export {};
