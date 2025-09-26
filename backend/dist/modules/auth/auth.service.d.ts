import { JwtService } from '@nestjs/jwt';
import { UsersService } from '../users/users.service';
import { User } from '../users/entities/user.entity';
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
interface JwtPayload {
    sub: number;
    email: string;
    role: string;
}
export declare class AuthService {
    private readonly usersService;
    private readonly jwtService;
    constructor(usersService: UsersService, jwtService: JwtService);
    register(registerData: RegisterDto): Promise<{
        message: string;
        user: Omit<User, "password" | "emailVerificationToken" | "passwordResetToken" | "hashPassword" | "comparePassword" | "toSafeObject">;
        verificationLink: string;
    }>;
    login(loginData: LoginDto): Promise<{
        message: string;
        user: Omit<User, "password" | "emailVerificationToken" | "passwordResetToken" | "hashPassword" | "comparePassword" | "toSafeObject">;
        access_token: string;
        token_type: string;
        expires_in: string;
    }>;
    verifyEmail(token: string): Promise<{
        message: string;
        user: Omit<User, "password" | "emailVerificationToken" | "passwordResetToken" | "hashPassword" | "comparePassword" | "toSafeObject">;
    }>;
    validateUser(payload: JwtPayload): Promise<any>;
    getProfile(userId: number): Promise<{
        message: string;
        user: User;
    }>;
    validateUserCredentials(email: string, password: string): Promise<any>;
}
export {};
