
import {
    IsDate,
    IsEmail,
    IsInt,
    IsOptional,
    IsString,
    Max,
    Min,
} from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Type } from 'class-transformer';

export class PatchUpdateUserPayload {
    @IsOptional()
    @IsString()
    @ApiPropertyOptional({
        description: '유저 이름',
        type: String,
    })
    name?: string | null;

    @IsOptional()
    @IsEmail()
    @ApiPropertyOptional({
        description: '유저 이메일',
        type: String,
    })
    email?: string | null;

    @IsOptional()
    @IsDate()
    @Type(() => Date)
    @ApiPropertyOptional({
        description: '유저 생일',
        type: Date,
        nullable: true,
    })
    birthday?: Date | null;

    @IsOptional()
    @IsInt()
    @ApiPropertyOptional({
        description: '도시 ID',
        type: Number,
        nullable: true,
    })
    cityId?: number | null;

    @IsOptional()
    @IsInt()
    @ApiPropertyOptional({
        description: '카테고리 ID',
        type: Number,
    })
    categoryId?: number | null;
}
