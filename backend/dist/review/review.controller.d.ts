import { ReviewService } from './review.service';
import { ReviewDto, ReviewListDto } from './dto/review.dto';
import { CreateReviewPayload } from './payload/create-review.payload';
import { ReviewQuery } from './query/review.query';
import { PutUpdateReviewPayload } from './payload/put-update-review.payload';
import { PatchUpdateReviewPayload } from './payload/patch-update-review.payload';
export declare class ReviewController {
    private readonly reviewService;
    constructor(reviewService: ReviewService);
    createReview(payload: CreateReviewPayload): Promise<ReviewDto>;
    getReviewById(reviewId: number): Promise<ReviewDto>;
    getReviews(query: ReviewQuery): Promise<ReviewListDto>;
    putUpdateReview(reviewId: number, payload: PutUpdateReviewPayload): Promise<ReviewDto>;
    patchUpdateReview(reviewId: number, payload: PatchUpdateReviewPayload): Promise<ReviewDto>;
    deleteReview(reviewId: number): Promise<void>;
}
