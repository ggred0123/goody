import { EventData } from '../type/event-data.type';
export declare class EventDto {
    hostId: number;
    id: number;
    title: string;
    description: string;
    categoryId: number;
    cityId: number;
    startTime: Date;
    endTime: Date;
    maxPeople: number;
    static from(event: EventData): EventDto;
    static fromArray(events: EventData[]): EventDto[];
}
export declare class EventListDto {
    events: EventDto[];
    static from(events: EventData[]): EventListDto;
}
