import { ApiProperty } from '@nestjs/swagger';
import { RegionData } from '../type/region-data.type';

export class RegionDto {
  @ApiProperty({
    description: '지역 ID',
    type: Number,
  })
  id!: number;

  @ApiProperty({
    description: '지역 이름(특별시/광역시/도)',
    type: String,
  })
  name!: string;

  static from(region: RegionData): RegionDto {
    return {
      id: region.id,
      name: region.name,
    };
  }

  static fromArray(regions: RegionData[]): RegionDto[] {
    return regions.map((region) => this.from(region));
  }
}

export class RegionListDto {
  @ApiProperty({
    description: '지역 목록',
    type: [RegionDto],
  })
  regions!: RegionDto[];

  static from(regions: RegionData[]): RegionListDto {
    return {
      regions: RegionDto.fromArray(regions),
    };
  }
}
