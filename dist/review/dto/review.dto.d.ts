import { ReviewData } from '../type/review-data.type';
export declare class ReviewDto {
    id: number;
    eventId: number;
    userId: number;
    score: number;
    title: string;
    description: string | null;
    static from(review: ReviewData): ReviewDto;
    static fromArray(reviews: ReviewData[]): ReviewDto[];
}
export declare class ReviewListDto {
    reviews: ReviewDto[];
    static from(reviews: ReviewData[]): ReviewListDto;
}
