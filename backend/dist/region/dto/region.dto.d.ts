import { RegionData } from '../type/region-data.type';
export declare class RegionDto {
    id: number;
    name: string;
    static from(region: RegionData): RegionDto;
    static fromArray(regions: RegionData[]): RegionDto[];
}
export declare class RegionListDto {
    regions: RegionDto[];
    static from(regions: RegionData[]): RegionListDto;
}
