import { Controller, Get } from '@nestjs/common';
import { ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import { RegionService } from './region.service';
import { RegionListDto } from './dto/region.dto';

@Controller('regions')
@ApiTags('Region API')
export class RegionController {
  constructor(private readonly regionService: RegionService) {}

  @Get()
  @ApiOperation({ summary: '모든 특별시/광역시/도 리스트' })
  @ApiOkResponse({ type: RegionListDto })
  async findAllRegions(): Promise<RegionListDto> {
    return this.regionService.findAllRegions();
  }
}
