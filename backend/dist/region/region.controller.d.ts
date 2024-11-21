import { RegionService } from './region.service';
import { RegionListDto } from './dto/region.dto';
export declare class RegionController {
    private readonly regionService;
    constructor(regionService: RegionService);
    findAllRegions(): Promise<RegionListDto>;
}
