import { ApiProperty } from '@nestjs/swagger';
import { ActivityData } from '../type/activity-data.type';

export class ActivityDto {
  @ApiProperty({
    description:'활동 이름',
    type: String,
  })
  title!: string;

  @ApiProperty({
    description: '활동 설명',
    type: String,
  })
  description!: string;

  @ApiProperty({
    description: '장소',
    type: String,
  })
  location!: string;
  

  @ApiProperty({
    description: '시간대',
    type: String,
  })
  timeZone!: string;



  static from(event: ActivityData): ActivityDto {
    return {
      title: event.title,
      description: event.description,
      location: event.location,
      timeZone: event.timeZone,
    };
  }

  static fromArray(activities: ActivityData[]): ActivityDto[] {
    return activities.map((activity) => this.from(activity));
  }
}

export class ActivityListDto {
  @ApiProperty({
    description: '활동 목록',
    type: [ActivityDto],
  })
  activities!: ActivityDto[];

  static from(activities: ActivityData[]): ActivityListDto {
    return {
      activities: ActivityDto.fromArray(activities),
    };
  }
}
