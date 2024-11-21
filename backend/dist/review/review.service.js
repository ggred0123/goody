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
exports.ReviewService = void 0;
const common_1 = require("@nestjs/common");
const review_repository_1 = require("./review.repository");
const review_dto_1 = require("./dto/review.dto");
let ReviewService = class ReviewService {
    constructor(reviewRepository) {
        this.reviewRepository = reviewRepository;
    }
    async createReview(payload) {
        const isReviewExist = await this.reviewRepository.isReviewExist(payload.userId, payload.eventId);
        if (isReviewExist) {
            throw new common_1.ConflictException('해당 유저의 리뷰가 이미 존재합니다.');
        }
        const isUserJoinedEvent = await this.reviewRepository.isUserJoinedEvent(payload.userId, payload.eventId);
        if (!isUserJoinedEvent) {
            throw new common_1.ConflictException('해당 유저가 이벤트에 참가하지 않았습니다.');
        }
        const event = await this.reviewRepository.getEventById(payload.eventId);
        if (!event) {
            throw new common_1.NotFoundException('Event가 존재하지 않습니다.');
        }
        if (event.endTime > new Date()) {
            throw new common_1.ConflictException('Event가 종료되지 않았습니다. 아직 리뷰를 작성할 수 없습니다.');
        }
        if (event.hostId === payload.userId) {
            throw new common_1.ConflictException('자신이 주최한 이벤트에는 리뷰를 작성 할 수 없습니다.');
        }
        const user = await this.reviewRepository.getUserById(payload.userId);
        if (!user) {
            throw new common_1.NotFoundException('User가 존재하지 않습니다.');
        }
        const createData = {
            userId: payload.userId,
            eventId: payload.eventId,
            score: payload.score,
            title: payload.title,
            description: payload.description,
        };
        const review = await this.reviewRepository.createReview(createData);
        return review_dto_1.ReviewDto.from(review);
    }
    async getReviewById(reviewId) {
        const review = await this.reviewRepository.getReviewById(reviewId);
        if (!review) {
            throw new common_1.NotFoundException('Review가 존재하지 않습니다.');
        }
        return review_dto_1.ReviewDto.from(review);
    }
    async getReviews(query) {
        const reviews = await this.reviewRepository.getReviews(query);
        return review_dto_1.ReviewListDto.from(reviews);
    }
    async putUpdateReview(reviewId, payload) {
        const review = await this.reviewRepository.getReviewById(reviewId);
        if (!review) {
            throw new common_1.NotFoundException('Review가 존재하지 않습니다.');
        }
        const updateData = {
            score: payload.score,
            title: payload.title,
            description: payload.description ?? null,
        };
        const updatedReview = await this.reviewRepository.updateReview(reviewId, updateData);
        return review_dto_1.ReviewDto.from(updatedReview);
    }
    async patchUpdateReview(reviewId, payload) {
        if (payload.score === null) {
            throw new common_1.BadRequestException('score는 null이 될 수 없습니다.');
        }
        if (payload.title === null) {
            throw new common_1.BadRequestException('title은 null이 될 수 없습니다.');
        }
        const review = await this.reviewRepository.getReviewById(reviewId);
        if (!review) {
            throw new common_1.NotFoundException('Review가 존재하지 않습니다.');
        }
        const updateData = {
            score: payload.score,
            title: payload.title,
            description: payload.description,
        };
        const updatedReview = await this.reviewRepository.updateReview(reviewId, updateData);
        return review_dto_1.ReviewDto.from(updatedReview);
    }
    async deleteReview(reviewId) {
        const review = await this.reviewRepository.getReviewById(reviewId);
        if (!review) {
            throw new common_1.NotFoundException('Review가 존재하지 않습니다.');
        }
        await this.reviewRepository.deleteReview(reviewId);
    }
};
exports.ReviewService = ReviewService;
exports.ReviewService = ReviewService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [review_repository_1.ReviewRepository])
], ReviewService);
//# sourceMappingURL=review.service.js.map