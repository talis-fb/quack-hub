import {
  Body,
  Controller,
  Get,
  NotFoundException,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { UserData } from './user.entity';
import { UserService } from './service/user.service';

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get(':id')
  async findAll(@Param('id') id: number) {
    const output = await this.userService.get(id);
    if (output === null) {
      throw new NotFoundException();
    }
    return output;
  }

  @Post(':id')
  async create(@Body() body: UserData) {
    return await this.userService.create(body);
  }

  @Put(':id')
  async update(@Param('id') id: number, @Body() body: UserData) {
    const output = await this.userService.update(id, body);
    if (output === null) {
      throw new NotFoundException();
    }
    return output;
  }
}
