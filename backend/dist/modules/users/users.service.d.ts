import { Repository } from 'typeorm';
import { User } from './entities/user.entity';
export declare class UsersService {
    private readonly userRepository;
    constructor(userRepository: Repository<User>);
    create(userData: {
        name: string;
        email: string;
        cpf: string;
        phone: string;
        password: string;
        emailVerificationToken?: string;
    }): Promise<User>;
    findByEmail(email: string): Promise<User | null>;
    findByCpf(cpf: string): Promise<User | null>;
    findById(id: number): Promise<User | null>;
    findByVerificationToken(token: string): Promise<User | null>;
    activateUser(userId: number): Promise<void>;
}
