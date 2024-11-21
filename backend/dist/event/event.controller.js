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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.EventController = void 0;
const common_1 = require("@nestjs/common");
const event_service_1 = require("./event.service");
const swagger_1 = require("@nestjs/swagger");
const event_dto_1 = require("./dto/event.dto");
const create_event_payload_1 = require("./payload/create-event.payload");
const create_eventJoin_payload_1 = require("./payload/create-eventJoin.payload");
const event_query_1 = require("./query/event.query");
const patch_update_event_payload_1 = require("./payload/patch-update-event.payload");
const put_update_event_payload_1 = require("./payload/put-update-event.payload");
let EventController = class EventController {
    constructor(eventService) {
        this.eventService = eventService;
    }
    async createEvent(payload) {
        return this.eventService.createEvent(payload);
    }
    async getEventById(eventId) {
        return this.eventService.getEventByEventId(eventId);
    }
    async getEvents(query) {
        return this.eventService.getEvents(query);
    }
    async joinEvent(eventId, payload) {
        return this.eventService.joinEvent(eventId, payload.userId);
    }
    async outEvent(eventId, payload) {
        return this.eventService.outEvent(eventId, payload.userId);
    }
    async patchUpdateEvent(eventId, payload) {
        return this.eventService.patchUpdateEvent(eventId, payload);
    }
    async putUpdateEvent(eventId, payload) {
        return this.eventService.putUpdateEvent(eventId, payload);
    }
    async deleteEvent(eventId) {
        return this.eventService.deleteEvent(eventId);
    }
};
exports.EventController = EventController;
__decorate([
    (0, common_1.Post)(),
    (0, swagger_1.ApiOperation)({ summary: '모임을 생성합니다' }),
    (0, swagger_1.ApiCreatedResponse)({ type: event_dto_1.EventDto }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_event_payload_1.CreateEventPayload]),
    __metadata("design:returntype", Promise)
], EventController.prototype, "createEvent", null);
__decorate([
    (0, common_1.Get)(':eventId'),
    (0, swagger_1.ApiOperation)({ summary: '모임 상세 정보를 가져옵니다' }),
    (0, swagger_1.ApiOkResponse)({ type: event_dto_1.EventDto }),
    __param(0, (0, common_1.Param)('eventId', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], EventController.prototype, "getEventById", null);
__decorate([
    (0, common_1.Get)(),
    (0, swagger_1.ApiOperation)({ summary: '여러 모임 정보를 가져옵니다' }),
    (0, swagger_1.ApiOkResponse)({ type: event_dto_1.EventListDto }),
    __param(0, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [event_query_1.EventQuery]),
    __metadata("design:returntype", Promise)
], EventController.prototype, "getEvents", null);
__decorate([
    (0, common_1.Post)(':eventId/join'),
    (0, swagger_1.ApiOperation)({ summary: '모임에 참가합니다' }),
    (0, swagger_1.ApiNoContentResponse)(),
    __param(0, (0, common_1.Param)('eventId', common_1.ParseIntPipe)),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, create_eventJoin_payload_1.EventParticipantPayload]),
    __metadata("design:returntype", Promise)
], EventController.prototype, "joinEvent", null);
__decorate([
    (0, common_1.Post)(':eventId/out'),
    (0, swagger_1.ApiOperation)({ summary: '유저를 event에서 내보냅니다.' }),
    (0, swagger_1.ApiNoContentResponse)(),
    __param(0, (0, common_1.Param)('eventId', common_1.ParseIntPipe)),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, create_eventJoin_payload_1.EventParticipantPayload]),
    __metadata("design:returntype", Promise)
], EventController.prototype, "outEvent", null);
__decorate([
    (0, common_1.Patch)(':eventId'),
    (0, swagger_1.ApiOperation)({ summary: '모임을 수정합니다' }),
    (0, swagger_1.ApiOkResponse)({ type: event_dto_1.EventDto }),
    __param(0, (0, common_1.Param)('eventId', common_1.ParseIntPipe)),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, patch_update_event_payload_1.PatchUpdateEventPayload]),
    __metadata("design:returntype", Promise)
], EventController.prototype, "patchUpdateEvent", null);
__decorate([
    (0, common_1.Put)(':eventId'),
    (0, swagger_1.ApiOperation)({ summary: '모임을 수정합니다' }),
    (0, swagger_1.ApiOkResponse)({ type: event_dto_1.EventDto }),
    __param(0, (0, common_1.Param)('eventId', common_1.ParseIntPipe)),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, put_update_event_payload_1.PutUpdateEventPayload]),
    __metadata("design:returntype", Promise)
], EventController.prototype, "putUpdateEvent", null);
__decorate([
    (0, common_1.Delete)(':eventId'),
    (0, common_1.HttpCode)(204),
    (0, swagger_1.ApiOperation)({ summary: '모임을 삭제합니다.' }),
    (0, swagger_1.ApiNoContentResponse)(),
    __param(0, (0, common_1.Param)('eventId', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], EventController.prototype, "deleteEvent", null);
exports.EventController = EventController = __decorate([
    (0, common_1.Controller)('events'),
    (0, swagger_1.ApiTags)('Event API'),
    __metadata("design:paramtypes", [event_service_1.EventService])
], EventController);
//# sourceMappingURL=event.controller.js.map