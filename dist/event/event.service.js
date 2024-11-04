"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.EventService = void 0;
const common_1 = require("@nestjs/common");
const event_repository_1 = require("./event.repository");
const event_dto_1 = require("./dto/event.dto");
let EventService = class EventService {
    constructor(eventRepository) {
        this.eventRepository = eventRepository;
    }
    async createEvent(payload) {
        const user = await this.eventRepository.getUserById(payload.hostId);
        if (!user) {
            throw new common_1.NotFoundException('host가 존재하지 않습니다.');
        }
        const category = await this.eventRepository.getCategoryById(payload.categoryId);
        if (!category) {
            throw new common_1.NotFoundException('category가 존재하지 않습니다.');
        }
        const city = await this.eventRepository.getCityById(payload.cityId);
        if (!city) {
            throw new common_1.NotFoundException('city가 존재하지 않습니다.');
        }
        if (payload.startTime < new Date()) {
            throw new common_1.ConflictException('시작 시간이 현재 시간보다 빠를 수 없습니다.');
        }
        if (payload.startTime > payload.endTime) {
            throw new common_1.ConflictException('시작 시간이 끝나는 시간보다 늦을 수 없습니다.');
        }
        const createData = {
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
        return event_dto_1.EventDto.from(event);
    }
    async getEventByEventId(eventId) {
        const event = await this.eventRepository.getEventById(eventId);
        if (!event) {
            throw new common_1.NotFoundException('event가 존재하지 않습니다.');
        }
        return event_dto_1.EventDto.from(event);
    }
    async getEvents(query) {
        const events = await this.eventRepository.getEvents(query);
        return event_dto_1.EventListDto.from(events);
    }
    async joinEvent(eventId, userId) {
        const isUserJoinedEvent = await this.eventRepository.isUserJoinedEvent(userId, eventId);
        if (isUserJoinedEvent) {
            throw new common_1.ConflictException('해당 유저가 이미 참가한 이벤트입니다.');
        }
        const event = await this.eventRepository.getEventById(eventId);
        if (!event) {
            throw new common_1.NotFoundException('Event가 존재하지 않습니다.');
        }
        if (event.endTime < new Date()) {
            throw new common_1.ConflictException('이미 시작된 이벤트는 참가할 수 없습니다.');
        }
        const currentPeople = await this.eventRepository.getEventJoinCount(eventId);
        if (event.maxPeople == currentPeople) {
            throw new common_1.ConflictException('이미 정원이 다 찼습니다.');
        }
        await this.eventRepository.joinEvent(eventId, userId);
    }
    async outEvent(eventId, userId) {
        const isUserJoinedEvent = await this.eventRepository.isUserJoinedEvent(userId, eventId);
        if (!isUserJoinedEvent) {
            throw new common_1.ConflictException('해당 유저가 참가하지 않은 이벤트입니다.');
        }
        const event = await this.eventRepository.getEventById(eventId);
        if (!event) {
            throw new common_1.NotFoundException('Event가 존재하지 않습니다.');
        }
        if (event.hostId === userId) {
            throw new common_1.ConflictException('host는 이벤트에서 나갈 수 없습니다.');
        }
        if (event.startTime < new Date()) {
            throw new common_1.ConflictException('이미 시작된 이벤트는 나갈 수 없습니다.');
        }
        await this.eventRepository.outEvent(eventId, userId);
    }
    async putUpdateEvent(eventId, payload) {
        const event = await this.eventRepository.getEventById(eventId);
        if (!event) {
            throw new common_1.NotFoundException('Event가 존재하지 않습니다.');
        }
        const updateData = {
            title: payload.title,
            description: payload.description,
            categoryId: payload.categoryId,
            cityId: payload.cityId,
            startTime: payload.startTime,
            endTime: payload.endTime,
            maxPeople: payload.maxPeople,
        };
        if (payload.maxPeople < 1) {
            throw new common_1.ConflictException('maxPeople은 1이상이어야 합니다.');
        }
        const category = await this.eventRepository.getCategoryById(payload.categoryId);
        if (!category) {
            throw new common_1.NotFoundException('category가 존재하지 않습니다.');
        }
        const city = await this.eventRepository.getCityById(payload.cityId);
        if (!city) {
            throw new common_1.NotFoundException('city가 존재하지 않습니다.');
        }
        if (event.startTime < new Date()) {
            throw new common_1.ConflictException('이미 시작된 이벤트는 수정할 수 없습니다.');
        }
        if (payload.startTime > payload.endTime) {
            throw new common_1.ConflictException('시작 시간이 끝나는 시간보다 늦게 수정할 수 없습니다.');
        }
        if (payload.startTime < new Date()) {
            throw new common_1.ConflictException('시작 시간이 현재 시간보다 빠르게 수정할 수 없습니다.');
        }
        const updatedEvent = await this.eventRepository.updateEvent(eventId, updateData);
        return event_dto_1.EventDto.from(updatedEvent);
    }
    async patchUpdateEvent(eventId, payload) {
        if (payload.title === null) {
            throw new common_1.BadRequestException('title은 null이 될 수 없습니다.');
        }
        if (payload.description === null) {
            throw new common_1.BadRequestException('description은 null이 될 수 없습니다.');
        }
        if (payload.categoryId === null) {
            throw new common_1.BadRequestException('categoryId은 null이 될 수 없습니다.');
        }
        if (payload.cityId === null) {
            throw new common_1.BadRequestException('cityId은 null이 될 수 없습니다.');
        }
        if (payload.startTime === null) {
            throw new common_1.BadRequestException('startTime은 null이 될 수 없습니다.');
        }
        if (payload.endTime === null) {
            throw new common_1.BadRequestException('endTime은 null이 될 수 없습니다.');
        }
        if (payload.maxPeople === null) {
            throw new common_1.BadRequestException('maxPeople은 null이 될 수 없습니다.');
        }
        const event = await this.eventRepository.getEventById(eventId);
        if (!event) {
            throw new common_1.NotFoundException('Event가 존재하지 않습니다.');
        }
        const updateData = {
            title: payload.title,
            description: payload.description,
            categoryId: payload.categoryId,
            cityId: payload.cityId,
            startTime: payload.startTime,
            endTime: payload.endTime,
            maxPeople: payload.maxPeople,
        };
        if (event.startTime < new Date()) {
            throw new common_1.ConflictException('이미 시작된 이벤트는 수정할 수 없습니다.');
        }
        if (event.endTime < new Date()) {
            throw new common_1.ConflictException('이미 종료된 이벤트는 수정할 수 없습니다.');
        }
        if (!payload.startTime && payload.endTime) {
            if (payload.endTime < event.startTime) {
                throw new common_1.ConflictException('시작 시간이 끝나는 시간보다 늦게 수정할 수 없습니다.');
            }
        }
        if (payload.startTime && !payload.endTime) {
            if (payload.startTime > event.endTime) {
                throw new common_1.ConflictException('시작 시간이 끝나는 시간보다 늦게 수정할 수 없습니다.');
            }
        }
        if (payload.startTime && payload.endTime) {
            if (payload.startTime > payload.endTime) {
                throw new common_1.ConflictException('시작 시간이 끝나는 시간보다 늦게 수정할 수 없습니다.');
            }
        }
        if (!payload.maxPeople || payload.maxPeople < 1) {
            throw new common_1.ConflictException('maxPeople은 1이상이어야 합니다.');
        }
        if (payload.categoryId) {
            const category = await this.eventRepository.getCategoryById(payload.categoryId);
            if (!category) {
                throw new common_1.NotFoundException('category가 존재하지 않습니다.');
            }
        }
        if (payload.cityId) {
            const city = await this.eventRepository.getCityById(payload.cityId);
            if (!city) {
                throw new common_1.NotFoundException('city가 존재하지 않습니다.');
            }
        }
        const updatedEvent = await this.eventRepository.updateEvent(eventId, updateData);
        return event_dto_1.EventDto.from(updatedEvent);
    }
    async deleteEvent(eventId) {
        const event = await this.eventRepository.getEventById(eventId);
        if (!event) {
            throw new common_1.NotFoundException('Event가 존재하지 않습니다.');
        }
        if (event.startTime < new Date()) {
            throw new common_1.ConflictException('이미 시작된 이벤트는 삭제할 수 없습니다.');
        }
        await this.eventRepository.deleteEventJoin(eventId);
        await this.eventRepository.deleteEvent(eventId);
    }
};
exports.EventService = EventService;
exports.EventService = EventService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [event_repository_1.EventRepository])
], EventService);
//# sourceMappingURL=event.service.js.map