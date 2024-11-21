import { RegionRepository } from './region.repository';
import { RegionListDto } from './dto/region.dto';
export declare class RegionService {
    private readonly regionRepository;
    constructor(regionRepository: RegionRepository);
    findAllRegions(): Promise<RegionListDto>;
}
