import { PrismaService } from '../common/services/prisma.service';
import { Injectable } from '@nestjs/common';
import { User } from '@prisma/client';
import { UserData } from './type/user-data.type';
import { UserBaseInfo} from "../auth/type/user-base-info.type";
import { UpdateUserData } from './type/update-user-data.type';

@Injectable()
export class UserRepository {
    constructor(private readonly prisma: PrismaService) {}

    async getUserById(userId: number): Promise<User | null> {
        return this.prisma.user.findFirst({
            where: {
                id: userId,
                deletedAt: null,
            },
        });
    }

    async isEmailUnique(email: string): Promise<boolean> {
        const user = await this.prisma.user.findUnique({
            where: {
                email: email,
            },
        });

        return user === null;
    }

    async getUserInfoById(userId: number): Promise<UserData | null> {
        return this.prisma.user.findUnique({
            where: {
                id: userId,
            },
            select: {
                id: true,
                email: true,
                name: true,
                birthday: true,
                cityId: true,
                categoryId: true,
            },
        });
    }

    async deleteUser(userId: number): Promise<void> {
        await this.prisma.user.update({
            where: {
                id: userId,
            },
            data: {
                deletedAt: new Date(),
            },
        });
    }

    async updateUser(userId: number, data: UpdateUserData): Promise<UserData> {
        return this.prisma.user.update({
            where: {
                id: userId,
            },
            data: {
                email: data.email,
                name: data.name,
                birthday: data.birthday,
                cityId: data.cityId,
                categoryId: data.categoryId,
            },
            select: {
                id: true,
                email: true,
                name: true,
                birthday: true,
                cityId: true,
                categoryId: true,
            },
        });
    }
}
