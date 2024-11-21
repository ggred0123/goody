import {
  BadRequestException,
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { ReviewRepository } from './review.repository';
import { CreateReviewPayload } from './payload/create-review.payload';
import { ReviewDto, ReviewListDto } from './dto/review.dto';
import { CreateReviewData } from './type/create-review-data.type';
import { ReviewQuery } from './query/review.query';
import { UpdateReviewData } from './type/update-review-data.type';
import { PutUpdateReviewPayload } from './payload/put-update-review.payload';
import { PatchUpdateReviewPayload } from './payload/patch-update-review.payload';

@Injectable()
export class ReviewService {
  constructor(private readonly reviewRepository: ReviewRepository) {}

  async createReview(payload: CreateReviewPayload): Promise<ReviewDto> {
    const isReviewExist = await this.reviewRepository.isReviewExist(
      payload.userId,
      payload.eventId,
    );
    if (isReviewExist) {
      throw new ConflictException('해당 유저의 리뷰가 이미 존재합니다.');
    }

    const isUserJoinedEvent = await this.reviewRepository.isUserJoinedEvent(
      payload.userId,
      payload.eventId,
    );
    if (!isUserJoinedEvent) {
      throw new ConflictException('해당 유저가 이벤트에 참가하지 않았습니다.');
    }

    const event = await this.reviewRepository.getEventById(payload.eventId);
    if (!event) {
      throw new NotFoundException('Event가 존재하지 않습니다.');
    }

    if (event.endTime > new Date()) {
      throw new ConflictException(
        'Event가 종료되지 않았습니다. 아직 리뷰를 작성할 수 없습니다.',
      );
    }

    if (event.hostId === payload.userId) {
      throw new ConflictException(
        '자신이 주최한 이벤트에는 리뷰를 작성 할 수 없습니다.',
      );
    }

    const user = await this.reviewRepository.getUserById(payload.userId);
    if (!user) {
      throw new NotFoundException('User가 존재하지 않습니다.');
    }

    const createData: CreateReviewData = {
      userId: payload.userId,
      eventId: payload.eventId,
      score: payload.score,
      title: payload.title,
      description: payload.description,
    };

    const review = await this.reviewRepository.createReview(createData);

    return ReviewDto.from(review);
  }

  async getReviewById(reviewId: number): Promise<ReviewDto> {
    const review = await this.reviewRepository.getReviewById(reviewId);

    if (!review) {
      throw new NotFoundException('Review가 존재하지 않습니다.');
    }

    return ReviewDto.from(review);
  }

  async getReviews(query: ReviewQuery): Promise<ReviewListDto> {
    const reviews = await this.reviewRepository.getReviews(query);

    return ReviewListDto.from(reviews);
  }

  async putUpdateReview(
    reviewId: number,
    payload: PutUpdateReviewPayload,
  ): Promise<ReviewDto> {
    const review = await this.reviewRepository.getReviewById(reviewId);

    if (!review) {
      throw new NotFoundException('Review가 존재하지 않습니다.');
    }

    const updateData: UpdateReviewData = {
      score: payload.score,
      title: payload.title,
      description: payload.description ?? null,
    };

    const updatedReview = await this.reviewRepository.updateReview(
      reviewId,
      updateData,
    );

    return ReviewDto.from(updatedReview);
  }

  async patchUpdateReview(
    reviewId: number,
    payload: PatchUpdateReviewPayload,
  ): Promise<ReviewDto> {
    if (payload.score === null) {
      throw new BadRequestException('score는 null이 될 수 없습니다.');
    }

    if (payload.title === null) {
      throw new BadRequestException('title은 null이 될 수 없습니다.');
    }

    const review = await this.reviewRepository.getReviewById(reviewId);

    if (!review) {
      throw new NotFoundException('Review가 존재하지 않습니다.');
    }

    const updateData: UpdateReviewData = {
      score: payload.score,
      title: payload.title,
      description: payload.description,
    };

    const updatedReview = await this.reviewRepository.updateReview(
      reviewId,
      updateData,
    );

    return ReviewDto.from(updatedReview);
  }

  async deleteReview(reviewId: number): Promise<void> {
    const review = await this.reviewRepository.getReviewById(reviewId);

    if (!review) {
      throw new NotFoundException('Review가 존재하지 않습니다.');
    }

    await this.reviewRepository.deleteReview(reviewId);
  }
}
