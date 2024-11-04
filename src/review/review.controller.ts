import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  Put,
  Query,
} from '@nestjs/common';
import { ReviewService } from './review.service';
import {
  ApiCreatedResponse,
  ApiNoContentResponse,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';
import { ReviewDto, ReviewListDto } from './dto/review.dto';
import { CreateReviewPayload } from './payload/create-review.payload';
import { ReviewQuery } from './query/review.query';
import { PutUpdateReviewPayload } from './payload/put-update-review.payload';
import { PatchUpdateReviewPayload } from './payload/patch-update-review.payload';

@Controller('reviews')
@ApiTags('Review API')
export class ReviewController {
  constructor(private readonly reviewService: ReviewService) {}

  @Post()
  @ApiOperation({ summary: '리뷰를 생성합니다' })
  @ApiCreatedResponse({ type: ReviewDto })
  async createReview(@Body() payload: CreateReviewPayload): Promise<ReviewDto> {
    return this.reviewService.createReview(payload);
  }

  @Get(':reviewId')
  @ApiOperation({ summary: '리뷰 상세 정보를 가져옵니다' })
  @ApiOkResponse({ type: ReviewDto })
  async getReviewById(
    @Param('reviewId', ParseIntPipe) reviewId: number,
  ): Promise<ReviewDto> {
    return this.reviewService.getReviewById(reviewId);
  }

  @Get()
  @ApiOperation({ summary: '여러 리뷰 정보를 가져옵니다' })
  @ApiOkResponse({ type: ReviewListDto })
  async getReviews(@Query() query: ReviewQuery): Promise<ReviewListDto> {
    return this.reviewService.getReviews(query);
  }

  @Put(':reviewId')
  @ApiOperation({ summary: '리뷰를 수정합니다' })
  @ApiOkResponse({ type: ReviewDto })
  async putUpdateReview(
    @Param('reviewId', ParseIntPipe) reviewId: number,
    @Body() payload: PutUpdateReviewPayload,
  ): Promise<ReviewDto> {
    return this.reviewService.putUpdateReview(reviewId, payload);
  }

  @Patch(':reviewId')
  @ApiOperation({ summary: '리뷰를 수정합니다' })
  @ApiOkResponse({ type: ReviewDto })
  async patchUpdateReview(
    @Param('reviewId', ParseIntPipe) reviewId: number,
    @Body() payload: PatchUpdateReviewPayload,
  ): Promise<ReviewDto> {
    return this.reviewService.patchUpdateReview(reviewId, payload);
  }

  @Delete(':reviewId')
  @HttpCode(204)
  @ApiOperation({ summary: '리뷰를 삭제합니다' })
  @ApiNoContentResponse()
  async deleteReview(
    @Param('reviewId', ParseIntPipe) reviewId: number,
  ): Promise<void> {
    return this.reviewService.deleteReview(reviewId);
  }
}
