import { PrismaService } from '../common/services/prisma.service';
import { RegionData } from './type/region-data.type';
export declare class RegionRepository {
    private readonly prisma;
    constructor(prisma: PrismaService);
    findAllRegions(): Promise<RegionData[]>;
}
