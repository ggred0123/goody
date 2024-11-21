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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ReviewController = void 0;
const common_1 = require("@nestjs/common");
const review_service_1 = require("./review.service");
const swagger_1 = require("@nestjs/swagger");
const review_dto_1 = require("./dto/review.dto");
const create_review_payload_1 = require("./payload/create-review.payload");
const review_query_1 = require("./query/review.query");
const put_update_review_payload_1 = require("./payload/put-update-review.payload");
const patch_update_review_payload_1 = require("./payload/patch-update-review.payload");
let ReviewController = class ReviewController {
    constructor(reviewService) {
        this.reviewService = reviewService;
    }
    async createReview(payload) {
        return this.reviewService.createReview(payload);
    }
    async getReviewById(reviewId) {
        return this.reviewService.getReviewById(reviewId);
    }
    async getReviews(query) {
        return this.reviewService.getReviews(query);
    }
    async putUpdateReview(reviewId, payload) {
        return this.reviewService.putUpdateReview(reviewId, payload);
    }
    async patchUpdateReview(reviewId, payload) {
        return this.reviewService.patchUpdateReview(reviewId, payload);
    }
    async deleteReview(reviewId) {
        return this.reviewService.deleteReview(reviewId);
    }
};
exports.ReviewController = ReviewController;
__decorate([
    (0, common_1.Post)(),
    (0, swagger_1.ApiOperation)({ summary: '리뷰를 생성합니다' }),
    (0, swagger_1.ApiCreatedResponse)({ type: review_dto_1.ReviewDto }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_review_payload_1.CreateReviewPayload]),
    __metadata("design:returntype", Promise)
], ReviewController.prototype, "createReview", null);
__decorate([
    (0, common_1.Get)(':reviewId'),
    (0, swagger_1.ApiOperation)({ summary: '리뷰 상세 정보를 가져옵니다' }),
    (0, swagger_1.ApiOkResponse)({ type: review_dto_1.ReviewDto }),
    __param(0, (0, common_1.Param)('reviewId', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], ReviewController.prototype, "getReviewById", null);
__decorate([
    (0, common_1.Get)(),
    (0, swagger_1.ApiOperation)({ summary: '여러 리뷰 정보를 가져옵니다' }),
    (0, swagger_1.ApiOkResponse)({ type: review_dto_1.ReviewListDto }),
    __param(0, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [review_query_1.ReviewQuery]),
    __metadata("design:returntype", Promise)
], ReviewController.prototype, "getReviews", null);
__decorate([
    (0, common_1.Put)(':reviewId'),
    (0, swagger_1.ApiOperation)({ summary: '리뷰를 수정합니다' }),
    (0, swagger_1.ApiOkResponse)({ type: review_dto_1.ReviewDto }),
    __param(0, (0, common_1.Param)('reviewId', common_1.ParseIntPipe)),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, put_update_review_payload_1.PutUpdateReviewPayload]),
    __metadata("design:returntype", Promise)
], ReviewController.prototype, "putUpdateReview", null);
__decorate([
    (0, common_1.Patch)(':reviewId'),
    (0, swagger_1.ApiOperation)({ summary: '리뷰를 수정합니다' }),
    (0, swagger_1.ApiOkResponse)({ type: review_dto_1.ReviewDto }),
    __param(0, (0, common_1.Param)('reviewId', common_1.ParseIntPipe)),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, patch_update_review_payload_1.PatchUpdateReviewPayload]),
    __metadata("design:returntype", Promise)
], ReviewController.prototype, "patchUpdateReview", null);
__decorate([
    (0, common_1.Delete)(':reviewId'),
    (0, common_1.HttpCode)(204),
    (0, swagger_1.ApiOperation)({ summary: '리뷰를 삭제합니다' }),
    (0, swagger_1.ApiNoContentResponse)(),
    __param(0, (0, common_1.Param)('reviewId', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], ReviewController.prototype, "deleteReview", null);
exports.ReviewController = ReviewController = __decorate([
    (0, common_1.Controller)('reviews'),
    (0, swagger_1.ApiTags)('Review API'),
    __metadata("design:paramtypes", [review_service_1.ReviewService])
], ReviewController);
//# sourceMappingURL=review.controller.js.map