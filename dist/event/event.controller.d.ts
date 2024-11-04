import { EventService } from './event.service';
import { EventDto, EventListDto } from './dto/event.dto';
import { CreateEventPayload } from './payload/create-event.payload';
import { EventParticipantPayload } from './payload/create-eventJoin.payload';
import { EventQuery } from './query/event.query';
import { PatchUpdateEventPayload } from './payload/patch-update-event.payload';
import { PutUpdateEventPayload } from './payload/put-update-event.payload';
export declare class EventController {
    private readonly eventService;
    constructor(eventService: EventService);
    createEvent(payload: CreateEventPayload): Promise<EventDto>;
    getEventById(eventId: number): Promise<EventDto>;
    getEvents(query: EventQuery): Promise<EventListDto>;
    joinEvent(eventId: number, payload: EventParticipantPayload): Promise<void>;
    outEvent(eventId: number, payload: EventParticipantPayload): Promise<void>;
    patchUpdateEvent(eventId: number, payload: PatchUpdateEventPayload): Promise<EventDto>;
    putUpdateEvent(eventId: number, payload: PutUpdateEventPayload): Promise<EventDto>;
    deleteEvent(eventId: number): Promise<void>;
}
