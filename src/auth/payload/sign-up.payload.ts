import { IsDate, IsEmail, IsInt, IsOptional, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';

export class SignUpPayload {
  @IsEmail()
  @ApiProperty({
    description: '이메일',
    type: String,
  })
  email!: string;

  @IsString()
  @ApiProperty({
    description: '비밀번호',
    type: String,
  })
  password!: string;

  @IsString()
  @ApiProperty({
    description: '이름',
    type: String,
  })
  name!: string;

  @IsOptional()
  @IsDate()
  @Type(() => Date)
  @ApiProperty({
    description: '생년월일',
    type: Date,
    nullable: true,
  })
  birthday?: Date | null;

  @IsOptional()
  @IsInt()
  @ApiProperty({
    description: '도시 ID',
    type: Number,
    nullable: true,
  })
  cityId?: number | null;

  @IsInt()
  @ApiProperty({
    description: '카테고리 ID',
    type: Number,
  })
  categoryId!: number;
}
