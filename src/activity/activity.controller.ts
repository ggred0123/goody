import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  Put,
  Query,
} from '@nestjs/common';
import { ActivityService } from './activity.service';
import {
  ApiCreatedResponse,
  ApiNoContentResponse,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';
import { ActivityDto, ActivityListDto } from './dto/activity.dto';
import { CreateActivityPayload } from './payload/create-activity.payload';
import { ActivityParticipantPayload } from './payload/create-activityJoin.payload';
import { ActivityQuery } from './query/activity.query';
import { PatchUpdateActivityPayload } from './payload/patch-update-activity.payload';
import { PutUpdateActivityPayload } from './payload/put-update-activity.payload';

@Controller('activities')
@ApiTags('Activity API')
export class ActivityController {
  constructor(private readonly activityService: ActivityService) {}

  @Post()
  @ApiOperation({ summary: '모임을 생성합니다' })
  @ApiCreatedResponse({ type: ActivityDto })
  async createActivity(@Body() payload: CreateActivityPayload): Promise<ActivityDto> {
    return this.activityService.createActivity(payload);
  }

  @Get(':activityId')
  @ApiOperation({ summary: '모임 상세 정보를 가져옵니다' })
  @ApiOkResponse({ type: ActivityDto })
  async getActivityById(
    @Param('activityId', ParseIntPipe) activityId: number,
  ): Promise<ActivityDto> {
    return this.activityService.getActivityByActivityId(activityId);
  }

  @Get()
  @ApiOperation({ summary: '여러 모임 정보를 가져옵니다' })
  @ApiOkResponse({ type: ActivityListDto })
  async getActivitys(@Query() query: ActivityQuery): Promise<ActivityListDto> {
    return this.activityService.getActivitys(query);
  }

  @Post(':activityId/join')
  @ApiOperation({ summary: '모임에 참가합니다' })
  @ApiNoContentResponse()
  async joinActivity(
    @Param('activityId', ParseIntPipe) activityId: number,
    @Body() payload: ActivityParticipantPayload,
  ): Promise<void> {
    return this.activityService.joinActivity(activityId, payload.userId);
  }

  @Post(':activityId/out')
  @ApiOperation({ summary: '유저를 activity에서 내보냅니다.' })
  @ApiNoContentResponse()
  async outActivity(
    @Param('activityId', ParseIntPipe) activityId: number,
    @Body() payload: ActivityParticipantPayload,
  ): Promise<void> {
    return this.activityService.outActivity(activityId, payload.userId);
  }

  @Patch(':activityId')
  @ApiOperation({ summary: '모임을 수정합니다' })
  @ApiOkResponse({ type: ActivityDto })
  async patchUpdateActivity(
    @Param('activityId', ParseIntPipe) activityId: number,
    @Body() payload: PatchUpdateActivityPayload,
  ): Promise<ActivityDto> {
    return this.activityService.patchUpdateActivity(activityId, payload);
  }

  @Put(':activityId')
  @ApiOperation({ summary: '모임을 수정합니다' })
  @ApiOkResponse({ type: ActivityDto })
  async putUpdateActivity(
    @Param('activityId', ParseIntPipe) activityId: number,
    @Body() payload: PutUpdateActivityPayload,
  ): Promise<ActivityDto> {
    return this.activityService.putUpdateActivity(activityId, payload);
  }

  @Delete(':activityId')
  @HttpCode(204)
  @ApiOperation({ summary: '모임을 삭제합니다.' })
  @ApiNoContentResponse()
  async deleteActivity(
    @Param('activityId', ParseIntPipe) activityId: number,
  ): Promise<void> {
    return this.activityService.deleteActivity(activityId);
  }
}
