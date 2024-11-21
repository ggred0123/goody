import { PrismaService } from '../common/services/prisma.service';
import { Injectable } from '@nestjs/common';
import { UserBaseInfo } from './type/user-base-info.type';
import { Category, City } from '@prisma/client';
import { SignUpData } from './type/sign-up-data.type';
import { UpdateUserData } from './type/update-user-data.type';

@Injectable()
export class AuthRepository {
  constructor(private readonly prisma: PrismaService) {}

  async createUser(data: SignUpData): Promise<UserBaseInfo> {
    return this.prisma.user.create({
      data: {
        email: data.email,
        password: data.password,
        name: data.name,
        birthday: data.birthday,
        categoryId: data.categoryId,
        cityId: data.cityId,
      },
      select: {
        id: true,
        email: true,
        password: true,
        name: true,
        birthday: true,
        categoryId: true,
        cityId: true,
        refreshToken: true,
      },
    });
  }

  async updateUser(id: number, data: UpdateUserData): Promise<UserBaseInfo> {
    return this.prisma.user.update({
      where: {
        id: id,
      },
      data: {
        email: data.email,
        password: data.password,
        name: data.name,
        birthday: data.birthday,
        categoryId: data.categoryId,
        cityId: data.cityId,
        refreshToken: data.refreshToken,
      },
      select: {
        id: true,
        email: true,
        password: true,
        name: true,
        birthday: true,
        categoryId: true,
        cityId: true,
        refreshToken: true,
      },
    });
  }

  async getUserById(id: number): Promise<UserBaseInfo | null> {
    return this.prisma.user.findUnique({
      where: {
        id: id,
        deletedAt: null,
      },
      select: {
        id: true,
        email: true,
        password: true,
        name: true,
        birthday: true,
        categoryId: true,
        cityId: true,
        refreshToken: true,
      },
    });
  }

  async getUserByEmail(email: string): Promise<UserBaseInfo | null> {
    return this.prisma.user.findUnique({
      where: {
        email,
        deletedAt: null,
      },
      select: {
        id: true,
        email: true,
        password: true,
        name: true,
        birthday: true,
        categoryId: true,
        cityId: true,
        refreshToken: true,
      },
    });
  }

  async getCategoryById(id: number): Promise<Category | null> {
    return this.prisma.category.findUnique({
      where: {
        id,
      },
    });
  }

  async getCityById(id: number): Promise<City | null> {
    return this.prisma.city.findUnique({
      where: {
        id,
      },
    });
  }
}
