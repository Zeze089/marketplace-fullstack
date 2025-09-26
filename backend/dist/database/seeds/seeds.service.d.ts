import { Repository } from 'typeorm';
import { User } from '../../modules/users/entities/user.entity';
import { Product } from '../../modules/products/entities/product.entity';
export declare class SeedsService {
    private readonly userRepository;
    private readonly productRepository;
    private readonly logger;
    constructor(userRepository: Repository<User>, productRepository: Repository<Product>);
    runAllSeeds(): Promise<void>;
    private seedUsers;
    private seedProducts;
    clearAllData(): Promise<void>;
}
