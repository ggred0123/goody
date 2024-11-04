import { Controller, Delete, HttpCode, Param } from '@nestjs/common';
import { UserService } from './user.service';
import { ApiNoContentResponse, ApiOperation } from '@nestjs/swagger';

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Delete(':userId')
  @HttpCode(204)
  @ApiOperation({ summary: '유저 탈퇴' })
  @ApiNoContentResponse()
  async deleteUser(@Param('userId') userId: number): Promise<void> {
    return this.userService.deleteUser(userId);
  }
}
