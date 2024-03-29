import {
  Body,
  Controller,
  Get,
  NotFoundException,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { UserData } from './user.entity';
import { Public } from 'src/decorators/public.decorator';
import { UserService } from './user.service';

@Public()
@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  async findAll() {
    const output = await this.userService.findAll();
    return output;
  }

  @Get(':id')
  async findOneById(@Param('id') id: number) {
    const output = await this.userService.getUserById(id);
    if (output === null) {
      throw new NotFoundException();
    }
    return output;
  }

  @Patch(':id')
  async update(@Param('id') id: number, @Body() body: UserData) {
    const output = await this.userService.update(id, body);
    if (output === null) {
      throw new NotFoundException();
    }
    return output;
  }

  @Post('/:id/follow/:id_to_follow')
  async follow(
    @Param('id') id: number,
    @Param('id_to_follow') idToFollow: number,
  ) {
    return await this.userService.follow(id, idToFollow);
  }

  @Get(':id/followers')
  async getFollowers(@Param('id') id: number) {
    return await this.userService.getFollowers(id);
  }

  @Get(':id/following')
  async getFollowing(@Param('id') id: number) {
    return await this.userService.getFollowing(id);
  }
}
