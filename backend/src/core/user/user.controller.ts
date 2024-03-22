import {
  Body,
  Controller,
  Get,
  NotFoundException,
  Param,
  Patch,
  Post,
  Put,
  ValidationPipe,
} from '@nestjs/common';
import { UserData } from './user.entity';
import { UserService } from './service/user.service';

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

  @Post()
  async create(@Body(new ValidationPipe({ transform: true })) body: UserData) {
    return await this.userService.create(body);
  }

  @Patch(':id')
  async update(@Param('id') id: number, @Body() body: UserData) {
    const output = await this.userService.update(id, body);
    if (output === null) {
      throw new NotFoundException();
    }
    return output;
  }
}
