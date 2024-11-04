import { Injectable } from '@nestjs/common';
import { RegionRepository } from './region.repository';
import { RegionListDto } from './dto/region.dto';
import { RegionData } from './type/region-data.type';

@Injectable()
export class RegionService {
  constructor(private readonly regionRepository: RegionRepository) {}

  async findAllRegions(): Promise<RegionListDto> {
    const regions: RegionData[] = await this.regionRepository.findAllRegions();

    return RegionListDto.from(regions);
  }
}
