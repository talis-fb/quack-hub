import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Put,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { MethodologiesService } from 'src/methodologies/methodologies.service';
import { MethodologieData } from 'src/methodologies/methodologie.entity';

@ApiTags('methodologies')
@Controller('methodologies')
export class MethodologiesController {
  constructor(private readonly methodologiesService: MethodologiesService) {}

  @Get()
  async findMany() {
    const output = await this.methodologiesService.findMany();
    return output;
  }

  @Get(':id')
  async findOneById(@Param('id', ParseIntPipe) id: number) {
    const output = await this.methodologiesService.findById(id);
    return output;
  }

  @Post()
  async create(@Body() createExperienceDto: MethodologieData) {
    return await this.methodologiesService.create(createExperienceDto);
  }

  @Put(':id')
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateExperienceDto: MethodologieData,
  ) {
    return await this.methodologiesService.update(id, updateExperienceDto);
  }

  @Delete(':id')
  async delete(@Param('id', ParseIntPipe) id: number) {
    return await this.methodologiesService.delete(id);
  }
}
