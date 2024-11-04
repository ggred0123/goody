import { Module } from '@nestjs/common';
import { RegionController } from './region.controller';
import { RegionService } from './region.service';
import { RegionRepository } from './region.repository';

@Module({
  controllers: [RegionController],
  providers: [RegionService, RegionRepository],
})
export class RegionModule {}
