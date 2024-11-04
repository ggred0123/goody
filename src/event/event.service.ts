import {
  BadRequestException,
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { EventRepository } from './event.repository';
import { CreateEventPayload } from './payload/create-event.payload';
import { EventDto, EventListDto } from './dto/event.dto';
import { CreateEventData } from './type/create-event-data.type';
import { EventQuery } from './query/event.query';
import { EventParticipantPayload } from './payload/create-eventJoin.payload';
import { UpdateEventData } from './type/update-event-data.type';
import { PatchUpdateEventPayload } from './payload/patch-update-event.payload';
import { PutUpdateEventPayload } from './payload/put-update-event.payload';

@Injectable()
export class EventService {
  constructor(private readonly eventRepository: EventRepository) {}

  async createEvent(payload: CreateEventPayload): Promise<EventDto> {
    const user = await this.eventRepository.getUserById(payload.hostId);
    if (!user) {
      throw new NotFoundException('host가 존재하지 않습니다.');
    }

    const category = await this.eventRepository.getCategoryById(
      payload.categoryId,
    );
    if (!category) {
      throw new NotFoundException('category가 존재하지 않습니다.');
    }

    const city = await this.eventRepository.getCityById(payload.cityId);
    if (!city) {
      throw new NotFoundException('city가 존재하지 않습니다.');
    }

    if (payload.startTime < new Date()) {
      throw new ConflictException(
        '시작 시간이 현재 시간보다 빠를 수 없습니다.',
      );
    }

    if (payload.startTime > payload.endTime) {
      throw new ConflictException(
        '시작 시간이 끝나는 시간보다 늦을 수 없습니다.',
      );
    }

    const createData: CreateEventData = {
      hostId: payload.hostId,
      title: payload.title,
      description: payload.description,
      categoryId: payload.categoryId,
      cityId: payload.cityId,
      startTime: payload.startTime,
      endTime: payload.endTime,
      maxPeople: payload.maxPeople,
    };

    const event = await this.eventRepository.createEvent(createData);

    return EventDto.from(event);
  }

  async getEventByEventId(eventId: number): Promise<EventDto> {
    const event = await this.eventRepository.getEventById(eventId);

    if (!event) {
      throw new NotFoundException('event가 존재하지 않습니다.');
    }

    return EventDto.from(event);
  }

  async getEvents(query: EventQuery): Promise<EventListDto> {
    const events = await this.eventRepository.getEvents(query);
    return EventListDto.from(events);
  }

  async joinEvent(eventId: number, userId: number): Promise<void> {
    const isUserJoinedEvent = await this.eventRepository.isUserJoinedEvent(
      userId,
      eventId,
    );
    const user = await this.eventRepository.getUserById(userId);

    if (!user) {
      throw new NotFoundException('존재하지 않는 user입니다.');
    }

    if (isUserJoinedEvent) {
      throw new ConflictException('해당 유저가 이미 참가한 이벤트입니다.');
    }

    const event = await this.eventRepository.getEventById(eventId);

    if (!event) {
      throw new NotFoundException('Event가 존재하지 않습니다.');
    }

    if (event.endTime < new Date()) {
      throw new ConflictException('이미 시작된 이벤트는 참가할 수 없습니다.');
    }

    const currentPeople = await this.eventRepository.getEventJoinCount(eventId);

    if (event.maxPeople == currentPeople) {
      throw new ConflictException('이미 정원이 다 찼습니다.');
    }

    await this.eventRepository.joinEvent(eventId, userId);
  }

  async outEvent(eventId: number, userId: number): Promise<void> {
    const isUserJoinedEvent = await this.eventRepository.isUserJoinedEvent(
      userId,
      eventId,
    );
    const user = await this.eventRepository.getUserById(userId);

    if (!user) {
      throw new NotFoundException('존재하지 않는 user입니다.');
    }

    if (!isUserJoinedEvent) {
      throw new ConflictException('해당 유저가 참가하지 않은 이벤트입니다.');
    }

    const event = await this.eventRepository.getEventById(eventId);
    if (!event) {
      throw new NotFoundException('Event가 존재하지 않습니다.');
    }

    if (event.hostId === userId) {
      throw new ConflictException('host는 이벤트에서 나갈 수 없습니다.');
    }

    if (event.startTime < new Date()) {
      throw new ConflictException('이미 시작된 이벤트는 나갈 수 없습니다.');
    }

    await this.eventRepository.outEvent(eventId, userId);
  }

  async putUpdateEvent(
    eventId: number,
    payload: PutUpdateEventPayload,
  ): Promise<EventDto> {
    const event = await this.eventRepository.getEventById(eventId);

    if (!event) {
      throw new NotFoundException('Event가 존재하지 않습니다.');
    }

    const updateData: UpdateEventData = {
      title: payload.title,
      description: payload.description,
      categoryId: payload.categoryId,
      cityId: payload.cityId,
      startTime: payload.startTime,
      endTime: payload.endTime,
      maxPeople: payload.maxPeople,
    };

    const category = await this.eventRepository.getCategoryById(
      payload.categoryId,
    );

    if (!category) {
      throw new NotFoundException('category가 존재하지 않습니다.');
    }

    const city = await this.eventRepository.getCityById(payload.cityId);

    if (!city) {
      throw new NotFoundException('city가 존재하지 않습니다.');
    }

    if (event.startTime < new Date()) {
      throw new ConflictException('이미 시작된 이벤트는 수정할 수 없습니다.');
    }

    if (payload.startTime > payload.endTime) {
      throw new ConflictException(
        '시작 시간이 끝나는 시간보다 늦게 수정할 수 없습니다.',
      );
    }
    if (payload.startTime < new Date()) {
      throw new ConflictException(
        '시작 시간이 현재 시간보다 빠르게 수정할 수 없습니다.',
      );
    }
    const eventJoinCount =
      await this.eventRepository.getEventJoinCount(eventId);

    if (payload.maxPeople < eventJoinCount) {
      throw new ConflictException(
        '정원을 현재 참가자 수보다 작게 수정할 수 없습니다.',
      );
    }

    const updatedEvent = await this.eventRepository.updateEvent(
      eventId,
      updateData,
    );

    return EventDto.from(updatedEvent);
  }

  async patchUpdateEvent(
    eventId: number,
    payload: PatchUpdateEventPayload,
  ): Promise<EventDto> {
    if (payload.title === null) {
      throw new BadRequestException('title은 null이 될 수 없습니다.');
    }
    if (payload.description === null) {
      throw new BadRequestException('description은 null이 될 수 없습니다.');
    }
    if (payload.categoryId === null) {
      throw new BadRequestException('categoryId은 null이 될 수 없습니다.');
    }
    if (payload.cityId === null) {
      throw new BadRequestException('cityId은 null이 될 수 없습니다.');
    }
    if (payload.startTime === null) {
      throw new BadRequestException('startTime은 null이 될 수 없습니다.');
    }
    if (payload.endTime === null) {
      throw new BadRequestException('endTime은 null이 될 수 없습니다.');
    }
    if (payload.maxPeople === null) {
      throw new BadRequestException('maxPeople은 null이 될 수 없습니다.');
    }

    const event = await this.eventRepository.getEventById(eventId);

    if (!event) {
      throw new NotFoundException('Event가 존재하지 않습니다.');
    }

    const updateData: UpdateEventData = {
      title: payload.title,
      description: payload.description,
      categoryId: payload.categoryId,
      cityId: payload.cityId,
      startTime: payload.startTime,
      endTime: payload.endTime,
      maxPeople: payload.maxPeople,
    };

    if (event.startTime < new Date()) {
      throw new ConflictException('이미 시작된 이벤트는 수정할 수 없습니다.');
    }

    if (
      payload.startTime &&
      payload.endTime &&
      payload.startTime > payload.endTime
    ) {
      throw new ConflictException(
        '시작 시간이 끝나는 시간보다 늦게 수정할 수 없습니다.',
      );
    }
    if (
      !payload.startTime &&
      payload.endTime &&
      payload.endTime < event.startTime
    ) {
      throw new ConflictException(
        '시작 시간이 현재 시간보다 빠르게 수정할 수 없습니다.',
      );
    }
    if (
      payload.startTime &&
      !payload.endTime &&
      payload.startTime > event.endTime
    ) {
      throw new ConflictException(
        '시작 시간이 현재 시간보다 빠르게 수정할 수 없습니다.',
      );
    }
    const eventJoinCount =
      await this.eventRepository.getEventJoinCount(eventId);

    if (payload.maxPeople && payload.maxPeople < eventJoinCount) {
      throw new ConflictException(
        '정원을 현재 참가자 수보다 작게 수정할 수 없습니다.',
      );
    }

    if (payload.categoryId) {
      const category = await this.eventRepository.getCategoryById(
        payload.categoryId,
      );

      if (!category) {
        throw new NotFoundException('category가 존재하지 않습니다.');
      }
    }

    if (payload.cityId) {
      const city = await this.eventRepository.getCityById(payload.cityId);

      if (!city) {
        throw new NotFoundException('city가 존재하지 않습니다.');
      }
    }

    const updatedEvent = await this.eventRepository.updateEvent(
      eventId,
      updateData,
    );

    return EventDto.from(updatedEvent);
  }

  async deleteEvent(eventId: number): Promise<void> {
    const event = await this.eventRepository.getEventById(eventId);

    if (!event) {
      throw new NotFoundException('Event가 존재하지 않습니다.');
    }

    if (event.startTime < new Date()) {
      throw new ConflictException('이미 시작된 이벤트는 삭제할 수 없습니다.');
    }

    await this.eventRepository.deleteEventWithJoins(eventId);
  }
}
