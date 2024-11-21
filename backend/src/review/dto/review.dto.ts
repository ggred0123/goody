import { ApiProperty } from '@nestjs/swagger';
import { ReviewData } from '../type/review-data.type';

export class ReviewDto {
  @ApiProperty({
    description: '리뷰 ID',
    type: Number,
  })
  id!: number;

  @ApiProperty({
    description: '모임 ID',
    type: Number,
  })
  eventId!: number;

  @ApiProperty({
    description: '유저 ID',
    type: Number,
  })
  userId!: number;

  @ApiProperty({
    description: '별점',
    type: Number,
  })
  score!: number;

  @ApiProperty({
    description: '리뷰 제목',
    type: String,
  })
  title!: string;

  @ApiProperty({
    description: '리뷰 내용',
    type: String,
    nullable: true,
  })
  description!: string | null;

  static from(review: ReviewData): ReviewDto {
    return {
      id: review.id,
      eventId: review.eventId,
      userId: review.userId,
      score: review.score,
      title: review.title,
      description: review.description,
    };
  }

  static fromArray(reviews: ReviewData[]): ReviewDto[] {
    return reviews.map((review) => this.from(review));
  }
}

export class ReviewListDto {
  @ApiProperty({
    description: '리뷰 목록',
    type: [ReviewDto],
  })
  reviews!: ReviewDto[];

  static from(reviews: ReviewData[]): ReviewListDto {
    return {
      reviews: ReviewDto.fromArray(reviews),
    };
  }
}
