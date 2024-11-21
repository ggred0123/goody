import {
    Controller,
    Delete,
    HttpCode,
    Param,
    Get,
    ParseIntPipe,
    UseGuards,
} from '@nestjs/common';
import { UserService } from './user.service';
import {
    ApiBearerAuth,
    ApiCreatedResponse,
    ApiNoContentResponse,
    ApiOkResponse,
    ApiOperation,
    ApiTags,
} from '@nestjs/swagger';
import { JwtAuthGuard} from "../auth/guard/jwt-auth.guard";
import { UserDto } from './dto/user.dto';
import { CurrentUser} from "../auth/decorator/user.decorator";
import { UserBaseInfo } from 'src/auth/type/user-base-info.type';

@Controller('users')
export class UserController {
    constructor(private readonly userService: UserService) {}

    @Get(':userId')
    @UseGuards(JwtAuthGuard)
    @ApiOperation({ summary: '유저 정보 조회' })
    @ApiOkResponse({ type: UserDto })
    async getUserInfoById(
        @Param('userId', ParseIntPipe) userId: number,
        @CurrentUser() user: UserBaseInfo,
    ): Promise<UserDto> {
        return this.userService.getUserInfoById(userId, user);
    }

    @Delete(':userId')
    @HttpCode(204)
    @UseGuards(JwtAuthGuard)
    @ApiBearerAuth()
    @ApiOperation({ summary: '유저 탈퇴' })
    @ApiNoContentResponse()
    async deleteUser(
        @Param('userId', ParseIntPipe) userId: number,
        @CurrentUser() user: UserBaseInfo,
    ): Promise<void> {
        return this.userService.deleteUser(userId, user);
    }
}
