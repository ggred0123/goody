import { IsDate, IsInt, IsOptional, IsString, Max, Min } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Type } from 'class-transformer';

export class PatchUpdateEventPayload {
  @IsOptional()
  @IsString()
  @ApiPropertyOptional({
    description: '모임 이름',
    type: String,
  })
  title?: string | null;

  @IsOptional()
  @IsString()
  @ApiPropertyOptional({
    description: '모임 설명',
    type: String,
  })
  description?: string | null;

  @IsOptional()
  @IsInt()
  @ApiPropertyOptional({
    description: '카테고리 ID',
    type: Number,
  })
  categoryId?: number | null;

  @IsOptional()
  @IsInt()
  @ApiPropertyOptional({
    description: '도시 ID',
    type: Number,
  })
  cityId?: number | null;

  @IsOptional()
  @IsDate()
  @Type(() => Date)
  @ApiPropertyOptional({
    description: '시작 시간',
    type: Date,
  })
  startTime?: Date | null;

  @IsOptional()
  @IsDate()
  @Type(() => Date)
  @ApiPropertyOptional({
    description: '종료 시간',
    type: Date,
  })
  endTime?: Date | null;

  @IsOptional()
  @IsInt()
  @Min(1)
  @ApiPropertyOptional({
    description: '최대 인원',
    type: Number,
  })
  maxPeople?: number | null;
}
