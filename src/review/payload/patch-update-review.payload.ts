import { IsInt, IsOptional, IsString, Max, Min } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class PatchUpdateReviewPayload {
  @IsOptional()
  @IsString()
  @ApiPropertyOptional({
    description: '리뷰 제목',
    type: String,
  })
  title?: string | null;

  @IsOptional()
  @IsInt()
  @Min(1)
  @Max(5)
  @ApiPropertyOptional({
    description: '별점',
    type: Number,
  })
  score?: number | null;

  @IsOptional()
  @IsString()
  @ApiPropertyOptional({
    description: '리뷰 내용',
    type: String,
    nullable: true,
  })
  description?: string | null;
}
