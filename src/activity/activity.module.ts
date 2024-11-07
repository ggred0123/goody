import { Module } from '@nestjs/common';
import { EventService } from './activity.service';
import { EventController } from './activity.controller';
import { EventRepository } from './activity.repository';

@Module({
  controllers: [EventController],
  providers: [EventService, EventRepository],
})
export class EventModule {}
