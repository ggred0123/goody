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
exports.CreateEventPayload = void 0;
const swagger_1 = require("@nestjs/swagger");
const class_validator_1 = require("class-validator");
const class_transformer_1 = require("class-transformer");
class CreateEventPayload {
}
exports.CreateEventPayload = CreateEventPayload;
__decorate([
    (0, class_validator_1.IsInt)(),
    (0, swagger_1.ApiProperty)({
        description: '호스트 ID',
        type: Number,
    }),
    __metadata("design:type", Number)
], CreateEventPayload.prototype, "hostId", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, swagger_1.ApiProperty)({
        description: '모임 이름',
        type: String,
    }),
    __metadata("design:type", String)
], CreateEventPayload.prototype, "title", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, swagger_1.ApiProperty)({
        description: '모임 설명',
        type: String,
    }),
    __metadata("design:type", String)
], CreateEventPayload.prototype, "description", void 0);
__decorate([
    (0, class_validator_1.IsInt)(),
    (0, swagger_1.ApiProperty)({
        description: '카테고리 ID',
        type: Number,
    }),
    __metadata("design:type", Number)
], CreateEventPayload.prototype, "categoryId", void 0);
__decorate([
    (0, class_validator_1.IsInt)(),
    (0, swagger_1.ApiProperty)({
        description: '도시 ID',
        type: Number,
    }),
    __metadata("design:type", Number)
], CreateEventPayload.prototype, "cityId", void 0);
__decorate([
    (0, class_validator_1.IsDate)(),
    (0, class_transformer_1.Type)(() => Date),
    (0, swagger_1.ApiProperty)({
        description: '시작 시간',
        type: Date,
    }),
    __metadata("design:type", Date)
], CreateEventPayload.prototype, "startTime", void 0);
__decorate([
    (0, class_validator_1.IsDate)(),
    (0, class_transformer_1.Type)(() => Date),
    (0, swagger_1.ApiProperty)({
        description: '종료 시간',
        type: Date,
    }),
    __metadata("design:type", Date)
], CreateEventPayload.prototype, "endTime", void 0);
__decorate([
    (0, class_validator_1.IsInt)(),
    (0, class_validator_1.Min)(1),
    (0, swagger_1.ApiProperty)({
        description: '최대 인원',
        type: Number,
    }),
    __metadata("design:type", Number)
], CreateEventPayload.prototype, "maxPeople", void 0);
//# sourceMappingURL=create-event.payload.js.map