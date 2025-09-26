"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthService = void 0;
const common_1 = require("@nestjs/common");
const jwt_1 = require("@nestjs/jwt");
const users_service_1 = require("../users/users.service");
const crypto = __importStar(require("crypto"));
let AuthService = class AuthService {
    usersService;
    jwtService;
    constructor(usersService, jwtService) {
        this.usersService = usersService;
        this.jwtService = jwtService;
    }
    async register(registerData) {
        try {
            const emailVerificationToken = crypto.randomBytes(32).toString('hex');
            const user = await this.usersService.create({
                ...registerData,
                emailVerificationToken,
            });
            console.log(`✉️ Token de verificação para ${user.email}: ${emailVerificationToken}`);
            console.log(`🔗 Link de verificação: http://localhost:3001/api/v1/auth/verify-email/${emailVerificationToken}`);
            return {
                message: 'Usuário criado com sucesso! Verifique seu e-mail para ativar a conta.',
                user: user.toSafeObject(),
                verificationLink: `http://localhost:3001/api/v1/auth/verify-email/${emailVerificationToken}`
            };
        }
        catch (error) {
            throw error;
        }
    }
    async login(loginData) {
        const user = await this.usersService.findByEmail(loginData.email);
        if (!user) {
            throw new common_1.UnauthorizedException('E-mail ou senha incorretos');
        }
        const isPasswordValid = await user.comparePassword(loginData.password);
        if (!isPasswordValid) {
            throw new common_1.UnauthorizedException('E-mail ou senha incorretos');
        }
        if (!user.isActive) {
            throw new common_1.UnauthorizedException('Conta não ativada. Verifique seu e-mail.');
        }
        const payload = {
            sub: user.id,
            email: user.email,
            role: user.role,
        };
        const access_token = this.jwtService.sign(payload);
        return {
            message: 'Login realizado com sucesso',
            user: user.toSafeObject(),
            access_token,
            token_type: 'Bearer',
            expires_in: '24h',
        };
    }
    async verifyEmail(token) {
        const user = await this.usersService.findByVerificationToken(token);
        if (!user) {
            throw new common_1.BadRequestException('Token de verificação inválido ou expirado');
        }
        await this.usersService.activateUser(user.id);
        return {
            message: 'E-mail verificado com sucesso! Sua conta está ativa.',
            user: user.toSafeObject(),
        };
    }
    async validateUser(payload) {
        const user = await this.usersService.findById(payload.sub);
        if (!user) {
            throw new common_1.UnauthorizedException('Token inválido');
        }
        return user;
    }
    async getProfile(userId) {
        const user = await this.usersService.findById(userId);
        if (!user) {
            throw new common_1.UnauthorizedException('Usuário não encontrado');
        }
        return {
            message: 'Perfil carregado com sucesso',
            user,
        };
    }
    async validateUserCredentials(email, password) {
        const user = await this.usersService.findByEmail(email);
        if (user && await user.comparePassword(password) && user.isActive) {
            return user.toSafeObject();
        }
        return null;
    }
};
exports.AuthService = AuthService;
exports.AuthService = AuthService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [users_service_1.UsersService,
        jwt_1.JwtService])
], AuthService);
//# sourceMappingURL=auth.service.js.map