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
exports.ReviewRepository = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../common/services/prisma.service");
let ReviewRepository = class ReviewRepository {
    constructor(prisma) {
        this.prisma = prisma;
    }
    async createReview(data) {
        return this.prisma.review.create({
            data: {
                userId: data.userId,
                eventId: data.eventId,
                score: data.score,
                title: data.title,
                description: data.description,
            },
            select: {
                id: true,
                userId: true,
                eventId: true,
                score: true,
                title: true,
                description: true,
            },
        });
    }
    async getUserById(userId) {
        return this.prisma.user.findFirst({
            where: {
                id: userId,
                deletedAt: null,
            },
        });
    }
    async getEventById(eventId) {
        return this.prisma.event.findUnique({
            where: {
                id: eventId,
            },
        });
    }
    async isReviewExist(userId, eventId) {
        const review = await this.prisma.review.findUnique({
            where: {
                eventId_userId: {
                    eventId,
                    userId,
                },
                user: {
                    deletedAt: null,
                },
            },
        });
        return !!review;
    }
    async isUserJoinedEvent(userId, eventId) {
        const event = await this.prisma.eventJoin.findUnique({
            where: {
                eventId_userId: {
                    eventId,
                    userId,
                },
                user: {
                    deletedAt: null,
                },
            },
        });
        return !!event;
    }
    async getReviewById(reviewId) {
        return this.prisma.review.findUnique({
            where: {
                id: reviewId,
            },
            select: {
                id: true,
                userId: true,
                eventId: true,
                score: true,
                title: true,
                description: true,
            },
        });
    }
    async getReviews(query) {
        return this.prisma.review.findMany({
            where: {
                eventId: query.eventId,
                user: {
                    deletedAt: null,
                    id: query.userId,
                },
            },
            select: {
                id: true,
                userId: true,
                eventId: true,
                score: true,
                title: true,
                description: true,
            },
        });
    }
    async updateReview(reviewId, data) {
        return this.prisma.review.update({
            where: {
                id: reviewId,
            },
            data: {
                score: data.score,
                title: data.title,
                description: data.description,
            },
            select: {
                id: true,
                userId: true,
                eventId: true,
                score: true,
                title: true,
                description: true,
            },
        });
    }
    async deleteReview(reviewId) {
        await this.prisma.review.delete({
            where: {
                id: reviewId,
            },
        });
    }
};
exports.ReviewRepository = ReviewRepository;
exports.ReviewRepository = ReviewRepository = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], ReviewRepository);
//# sourceMappingURL=review.repository.js.map