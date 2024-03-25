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
import { UserDto } from './dtos/user-dto';

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

  @Post()
  async create(@Body() body: UserDto) {
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
