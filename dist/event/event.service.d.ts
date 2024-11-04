import { EventRepository } from './event.repository';
import { CreateEventPayload } from './payload/create-event.payload';
import { EventDto, EventListDto } from './dto/event.dto';
import { EventQuery } from './query/event.query';
import { PatchUpdateEventPayload } from './payload/patch-update-event.payload';
import { PutUpdateEventPayload } from './payload/put-update-event.payload';
export declare class EventService {
    private readonly eventRepository;
    constructor(eventRepository: EventRepository);
    createEvent(payload: CreateEventPayload): Promise<EventDto>;
    getEventByEventId(eventId: number): Promise<EventDto>;
    getEvents(query: EventQuery): Promise<EventListDto>;
    joinEvent(eventId: number, userId: number): Promise<void>;
    outEvent(eventId: number, userId: number): Promise<void>;
    putUpdateEvent(eventId: number, payload: PutUpdateEventPayload): Promise<EventDto>;
    patchUpdateEvent(eventId: number, payload: PatchUpdateEventPayload): Promise<EventDto>;
    deleteEvent(eventId: number): Promise<void>;
}
