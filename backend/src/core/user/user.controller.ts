import {
  Body,
  Controller,
  Get,
  NotFoundException,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { UserService } from './user.service';
import { UserData } from './user.entity';

@Controller('users')
export class UserController {
  constructor(private readonly service: UserService) {}

  @Get(':id')
  async findAll(@Param('id') id: number) {
    const output = await this.service.get(id);
    if (output === null) {
      throw new NotFoundException();
    }
    return output;
  }

  @Post('/')
  async create(@Body() body: UserData) {
    return await this.service.create(body);
  }

  @Put(':id')
  async update(@Param('id') id: number, @Body() body: UserData) {
    const output = await this.service.update(id, body);
    if (output === null) {
      throw new NotFoundException();
    }
    return output;
  }
}
