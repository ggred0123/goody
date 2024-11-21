import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsDate, IsInt, IsOptional, IsString, Max, Min } from 'class-validator';
import { min } from 'lodash';
import { Type } from 'class-transformer';

export class EventParticipantPayload {
  @IsInt()
  @ApiProperty({
    description: '참가자 ID',
    type: Number,
  })
  userId!: number;
}
