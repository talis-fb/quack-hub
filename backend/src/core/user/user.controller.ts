import {
  Body,
  Controller,
  Get,
  NotFoundException,
  Param,
  Patch,
  Post,
  ParseIntPipe,
  Put,
  Query,
} from '@nestjs/common';
import { UserData } from './user.entity';
import { UserService } from './user.service';

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get('search/')
  async searchUsers(@Query('q') query: string) {
    return await this.userService.search(query);
  }

  @Get(':id')
  async findOneById(@Param('id', ParseIntPipe) id: number) {
    const output = await this.userService.getUserById(id);
    if (output === null) {
      throw new NotFoundException('Usuário não encontrado.');
    }
    return output;
  }

  @Put(':id')
  async update(@Param('id', ParseIntPipe) id: number, @Body() body: UserData) {
    const output = await this.userService.update(id, body);
    if (output === null) {
      throw new NotFoundException('Usuário não encontrado.');
    }
    return output;
  }

  @Post('/:id/follow/:id_to_follow')
  async follow(
    @Param('id', ParseIntPipe) id: number,
    @Param('id_to_follow', ParseIntPipe) idToFollow: number,
  ) {
    return await this.userService.follow(id, idToFollow);
  }

  @Get(':id/followers')
  async getFollowers(@Param('id', ParseIntPipe) id: number) {
    return await this.userService.getFollowers(id);
  }

  @Get(':id/following')
  async getFollowing(@Param('id', ParseIntPipe) id: number) {
    return await this.userService.getFollowing(id);
  }
}
