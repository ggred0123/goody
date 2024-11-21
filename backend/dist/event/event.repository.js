"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.EventRepository = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../common/services/prisma.service");
let EventRepository = class EventRepository {
    constructor(prisma) {
        this.prisma = prisma;
    }
    async createEvent(data) {
        return this.prisma.event.create({
            data: {
                hostId: data.hostId,
                title: data.title,
                description: data.description,
                categoryId: data.categoryId,
                cityId: data.cityId,
                startTime: data.startTime,
                endTime: data.endTime,
                maxPeople: data.maxPeople,
                eventJoin: {
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
    async getUserById(userId) {
        return this.prisma.user.findUnique({
            where: {
                id: userId,
            },
        });
    }
    async getCategoryById(categoryId) {
        return this.prisma.category.findUnique({
            where: {
                id: categoryId,
            },
        });
    }
    async getCityById(cityId) {
        return this.prisma.city.findUnique({
            where: {
                id: cityId,
            },
        });
    }
    async isEventExist(id) {
        const event = await this.prisma.event.findUnique({
            where: {
                id: id,
            },
        });
        return !!event;
    }
    async isUserJoinedEvent(userId, eventId) {
        const event = await this.prisma.eventJoin.findUnique({
            where: {
                eventId_userId: {
                    eventId,
                    userId,
                },
            },
        });
        return !!event;
    }
    async joinEvent(eventId, userId) {
        await this.prisma.eventJoin.create({
            data: {
                eventId,
                userId,
            },
            select: {
                id: true,
                eventId: true,
                userId: true,
                createdAt: true,
                updatedAt: true,
            },
        });
    }
    async getEventJoin(id) {
        return this.prisma.eventJoin.findUnique({
            where: {
                id: id,
            },
            select: {
                id: true,
                eventId: true,
                userId: true,
                createdAt: true,
                updatedAt: true,
            },
        });
    }
    async getEventJoinCount(eventId) {
        return this.prisma.eventJoin.count({
            where: {
                eventId,
            },
        });
    }
    async outEvent(eventId, userId) {
        await this.prisma.eventJoin.delete({
            where: {
                eventId_userId: {
                    eventId,
                    userId,
                },
            },
        });
    }
    async getEventById(id) {
        return this.prisma.event.findUnique({
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
    async getEvents(query) {
        return this.prisma.event.findMany({
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
    async updateEvent(eventId, data) {
        return this.prisma.event.update({
            where: {
                id: eventId,
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
    async deleteEventJoin(eventId) {
        await this.prisma.event.update({
            where: {
                id: eventId,
            },
            data: {
                eventJoin: {
                    deleteMany: {
                        eventId: eventId,
                    },
                },
            },
        });
    }
    async deleteEvent(id) {
        await this.prisma.event.delete({
            where: {
                id: id,
            },
        });
    }
};
exports.EventRepository = EventRepository;
exports.EventRepository = EventRepository = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], EventRepository);
//# sourceMappingURL=event.repository.js.map