import { Controller, Get, Param } from '@nestjs/common';
import { UserService } from './user.service';

@Controller('users')
export class UserController {
  constructor(private readonly service: UserService) {}

  @Get(':id')
  async findAll(@Param('id') id: number) {
    return this.service.get(id);
  }
}