import { PrismaService } from '../common/services/prisma.service';
import { CreateEventData } from './type/create-event-data.type';
import { EventData } from './type/event-data.type';
import { User, Category, City, EventJoin } from '@prisma/client';
import { EventQuery } from './query/event.query';
import { UpdateEventData } from './type/update-event-data.type';
export declare class EventRepository {
    private readonly prisma;
    constructor(prisma: PrismaService);
    createEvent(data: CreateEventData): Promise<EventData>;
    getUserById(userId: number): Promise<User | null>;
    getCategoryById(categoryId: number): Promise<Category | null>;
    getCityById(cityId: number): Promise<City | null>;
    isEventExist(id: number): Promise<boolean>;
    isUserJoinedEvent(userId: number, eventId: number): Promise<boolean>;
    joinEvent(eventId: number, userId: number): Promise<void>;
    getEventJoin(id: number): Promise<EventJoin | null>;
    getEventJoinCount(eventId: number): Promise<number>;
    outEvent(eventId: number, userId: number): Promise<void>;
    getEventById(id: number): Promise<EventData | null>;
    getEvents(query: EventQuery): Promise<EventData[]>;
    updateEvent(eventId: number, data: UpdateEventData): Promise<EventData>;
    deleteEventJoin(eventId: number): Promise<void>;
    deleteEvent(id: number): Promise<void>;
}
