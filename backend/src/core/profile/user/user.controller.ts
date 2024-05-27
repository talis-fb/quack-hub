import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  ParseIntPipe,
  Put,
  Query,
  Req,
} from '@nestjs/common';
import { InputUserData, UserData, UserEntityWithMethodologies } from './user.entity';
import { UserService } from './user.service';
import { ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('users')
@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @ApiResponse({
    status: 200,
    description: 'List of users filtered by name returned successfully.',
  })
  @Get('search/')
  async searchUsers(@Query('q') query: string) {
    return await this.userService.search(query);
  }

  @ApiResponse({
    status: 200,
    description: 'User profile returned successfully.',
  })
  @Get('auth')
  async getProfile(@Req() req): Promise<UserEntityWithMethodologies> {
    const { userId } = req.user;
    return await this.userService.getUserById(userId);
  }

  @ApiResponse({
    status: 200,
    description: 'User filtered by id returned successfully.',
  })
  @Get(':id')
  async getUserById(
    @Param('id', ParseIntPipe) id: number,
  ): Promise<UserEntityWithMethodologies> {
    return await this.userService.getUserById(id);
  }

  @ApiResponse({
    status: 200,
    description: 'The user has been successfully updated',
  })
  @Put(':id')
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() body: InputUserData,
  ): Promise<UserEntityWithMethodologies> {
    return await this.userService.update(id, body);
  }

  @ApiResponse({
    status: 201,
    description: 'User successfully followed another user',
  })
  @Post('/follow/:id_to_follow')
  async follow(
    @Req() req,
    @Param('id_to_follow', ParseIntPipe) idToFollow: number,
  ): Promise<void> {
    const { userId } = req.user;
    return await this.userService.follow(userId, idToFollow);
  }

  @ApiResponse({
    status: 201,
    description: 'User successfully unfollowed another user',
  })
  @Post('/unfollow/:id_to_follow')
  async unfollow(
    @Req() req,
    @Param('id_to_follow', ParseIntPipe) idToFollow: number,
  ): Promise<void> {
    const { userId } = req.user;
    return await this.userService.removeFollower(userId, idToFollow);
  }

  @ApiResponse({
    status: 200,
    description:
      "Successfully retrieved the user's list of followers filtered by id",
  })
  @Get(':id/followers')
  async getFollowers(
    @Param('id', ParseIntPipe) id: number,
  ): Promise<UserEntityWithMethodologies[]> {
    return await this.userService.getFollowers(id);
  }

  @ApiResponse({
    status: 200,
    description:
      "Successfully retrieved the user's following list filtered by id",
  })
  @Get(':id/following')
  async getFollowing(
    @Param('id', ParseIntPipe) id: number,
  ): Promise<UserEntityWithMethodologies[]> {
    return await this.userService.getFollowing(id);
  }
}
