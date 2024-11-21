import { Injectable } from '@nestjs/common';
import { PrismaService } from '../common/services/prisma.service';
import { CreateActivityData } from './type/create-activity-data.type';
import { ActivityData } from './type/activity-data.type';
import { User, Activity, Category, City, ActivityJoin } from '@prisma/client';
import { ActivityQuery } from './query/activity.query';
import { PrismaClient } from '@prisma/client';
import { UpdateActivityData } from './type/update-activity-data.type';

@Injectable()
export class ActivityRepository {
  constructor(private readonly prisma: PrismaService) {}

  async createActivity(data: CreateActivityData): Promise<ActivityData> {
    return this.prisma.activity.create({
      data: {
        hostId: data.hostId,
        title: data.title,
        description: data.description,
        categoryId: data.categoryId,
        cityId: data.cityId,
        startTime: data.startTime,
        endTime: data.endTime,
        maxPeople: data.maxPeople,
        activityJoin: {
          create: {
            userId: data.hostId,
          },
        },
      },
      select: {
        id: true,
        hostId: true,
        title: true,
        description: true,
        categoryId: true,
        cityId: true,
        startTime: true,
        endTime: true,
        maxPeople: true,
      },
    });
  }

  async getUserById(userId: number): Promise<User | null> {
    return this.prisma.user.findUnique({
      where: {
        id: userId,
        deletedAt: null,
      },
    });
  }

  async getCategoryById(categoryId: number): Promise<Category | null> {
    return this.prisma.category.findUnique({
      where: {
        id: categoryId,
      },
    });
  }

  async getCityById(cityId: number): Promise<City | null> {
    return this.prisma.city.findUnique({
      where: {
        id: cityId,
      },
    });
  }

  async isActivityExist(id: number): Promise<boolean> {
    const activity = await this.prisma.activity.findUnique({
      where: {
        id: id,
      },
    });

    return !!activity;
  }

  async isUserJoinedActivity(userId: number, activityId: number): Promise<boolean> {
    const activity = await this.prisma.activityJoin.findUnique({
      where: {
        activityId_userId: {
          activityId,
          userId,
        },
        user: {
          deletedAt: null,
        },
      },
    });

    return !!activity;
  }
  async joinActivity(activityId: number, userId: number): Promise<void> {
    await this.prisma.activityJoin.create({
      data: {
        activityId,
        userId,
      },
      select: {
        id: true,
        activityId: true,
        userId: true,
        createdAt: true,
        updatedAt: true,
      },
    });
  }
  async getActivityJoin(id: number): Promise<ActivityJoin | null> {
    return this.prisma.activityJoin.findUnique({
      where: {
        id: id,
      },
      select: {
        id: true,
        activityId: true,
        userId: true,
        createdAt: true,
        updatedAt: true,
      },
    });
  }

  async getActivityJoinCount(activityId: number): Promise<number> {
    return this.prisma.activityJoin.count({
      where: {
        activityId,
      },
    });
  }

  async outActivity(activityId: number, userId: number): Promise<void> {
    await this.prisma.activityJoin.delete({
      where: {
        activityId_userId: {
          activityId,
          userId,
        },
      },
    });
  }

  async getActivityById(id: number): Promise<ActivityData | null> {
    return this.prisma.activity.findUnique({
      where: {
        id: id,
      },
      select: {
        id: true,
        hostId: true,
        title: true,
        description: true,
        categoryId: true,
        cityId: true,
        startTime: true,
        endTime: true,
        maxPeople: true,
      },
    });
  }

  async getActivitys(query: ActivityQuery): Promise<ActivityData[]> {
    return this.prisma.activity.findMany({
      where: {
        hostId: query.hostId,
        cityId: query.cityId,
        categoryId: query.categoryId,
      },
      select: {
        id: true,
        hostId: true,
        title: true,
        description: true,
        categoryId: true,
        cityId: true,
        startTime: true,
        endTime: true,
        maxPeople: true,
      },
    });
  }

  async updateActivity(
    activityId: number,
    data: UpdateActivityData,
  ): Promise<ActivityData> {
    return this.prisma.activity.update({
      where: {
        id: activityId,
      },
      data: {
        title: data.title,
        description: data.description,
        categoryId: data.categoryId,
        cityId: data.cityId,
        startTime: data.startTime,
        endTime: data.endTime,
        maxPeople: data.maxPeople,
      },
      select: {
        id: true,
        hostId: true,
        title: true,
        description: true,
        categoryId: true,
        cityId: true,
        startTime: true,
        endTime: true,
        maxPeople: true,
      },
    });
  }

  async deleteActivityWithJoins(activityId: number): Promise<void> {
    await this.prisma.$transaction([
      this.prisma.activityJoin.deleteMany({
        where: {
          activityId: activityId,
        },
      }),
      this.prisma.activity.delete({
        where: {
          id: activityId,
        },
      }),
    ]);
  }
}
