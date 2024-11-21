import { IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';

export class PasswordChangePayload {
  @IsString()
  @ApiProperty({
    description: '비밀번호',
    type: String,
  })
  previousPassword!: string;

  @IsString()
  @ApiProperty({
    description: '비밀번호',
    type: String,
  })
  newPassword!: string;
}
