import {
  Body,
  Controller,
  Get,
  NotFoundException,
  Param,
  Post,
  ParseIntPipe,
  Put,
  Query,
  Req,
} from '@nestjs/common';
import { UserData } from './user.entity';
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
  async getProfile(@Req() req) {
    const { userId } = req.user;

    const output = await this.userService.getUserById(userId);

    if (output === null) {
      throw new NotFoundException('Usuário não encontrado.');
    }

    return output;
  }

  @ApiResponse({
    status: 200,
    description: 'User filtered by id returned successfully.',
  })
  @Get(':id')
  async findOneById(@Param('id', ParseIntPipe) id: number) {
    const output = await this.userService.getUserById(id);
    if (output === null) {
      throw new NotFoundException('Usuário não encontrado.');
    }
    return output;
  }

  @ApiResponse({
    status: 200,
    description: 'The user has been successfully updated',
  })
  @Put(':id')
  async update(@Param('id', ParseIntPipe) id: number, @Body() body: UserData) {
    const output = await this.userService.update(id, body);
    if (output === null) {
      throw new NotFoundException('Usuário não encontrado.');
    }
    return output;
  }

  @ApiResponse({
    status: 201,
    description: 'User successfully followed another user',
  })
  @Post('/:id/follow/:id_to_follow')
  async follow(
    @Param('id', ParseIntPipe) id: number,
    @Param('id_to_follow', ParseIntPipe) idToFollow: number,
  ) {
    return await this.userService.follow(id, idToFollow);
  }

  @ApiResponse({
    status: 200,
    description:
      "Successfully retrieved the user's list of followers filtered by id",
  })
  @Get(':id/followers')
  async getFollowers(@Param('id', ParseIntPipe) id: number) {
    return await this.userService.getFollowers(id);
  }

  @ApiResponse({
    status: 200,
    description:
      "Successfully retrieved the user's following list filtered by id",
  })
  @Get(':id/following')
  async getFollowing(@Param('id', ParseIntPipe) id: number) {
    return await this.userService.getFollowing(id);
  }
}
