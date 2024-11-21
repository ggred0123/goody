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
exports.RegionListDto = exports.RegionDto = void 0;
const swagger_1 = require("@nestjs/swagger");
class RegionDto {
    static from(region) {
        return {
            id: region.id,
            name: region.name,
        };
    }
    static fromArray(regions) {
        return regions.map((region) => this.from(region));
    }
}
exports.RegionDto = RegionDto;
__decorate([
    (0, swagger_1.ApiProperty)({
        description: '지역 ID',
        type: Number,
    }),
    __metadata("design:type", Number)
], RegionDto.prototype, "id", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: '지역 이름(특별시/광역시/도)',
        type: String,
    }),
    __metadata("design:type", String)
], RegionDto.prototype, "name", void 0);
class RegionListDto {
    static from(regions) {
        return {
            regions: RegionDto.fromArray(regions),
        };
    }
}
exports.RegionListDto = RegionListDto;
__decorate([
    (0, swagger_1.ApiProperty)({
        description: '지역 목록',
        type: [RegionDto],
    }),
    __metadata("design:type", Array)
], RegionListDto.prototype, "regions", void 0);
//# sourceMappingURL=region.dto.js.map