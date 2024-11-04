import { PrismaService } from '../common/services/prisma.service';
import { User } from '@prisma/client';
export declare class UserRepository {
    private readonly prisma;
    constructor(prisma: PrismaService);
    getUserById(userId: number): Promise<User | null>;
    deleteUser(userId: number): Promise<void>;
}
