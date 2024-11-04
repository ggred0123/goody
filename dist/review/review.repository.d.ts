import { PrismaService } from '../common/services/prisma.service';
import { CreateReviewData } from './type/create-review-data.type';
import { ReviewData } from './type/review-data.type';
import { User, Event } from '@prisma/client';
import { ReviewQuery } from './query/review.query';
import { UpdateReviewData } from './type/update-review-data.type';
export declare class ReviewRepository {
    private readonly prisma;
    constructor(prisma: PrismaService);
    createReview(data: CreateReviewData): Promise<ReviewData>;
    getUserById(userId: number): Promise<User | null>;
    getEventById(eventId: number): Promise<Event | null>;
    isReviewExist(userId: number, eventId: number): Promise<boolean>;
    isUserJoinedEvent(userId: number, eventId: number): Promise<boolean>;
    getReviewById(reviewId: number): Promise<ReviewData | null>;
    getReviews(query: ReviewQuery): Promise<ReviewData[]>;
    updateReview(reviewId: number, data: UpdateReviewData): Promise<ReviewData>;
    deleteReview(reviewId: number): Promise<void>;
}
