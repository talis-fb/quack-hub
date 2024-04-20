import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Put,
  Query,
} from '@nestjs/common';
import { VacanciesService } from './vacancies.service';
import { VacancyData } from './vacancies.entity';
import { UpdateVacancyDto } from './dtos/UpdateVacancyDto';
import { SearchVacanciesQueryDto } from './dtos/SearchVacanciesQueryDto';

@Controller('vacancies')
export class VacanciesController {
  constructor(private readonly vacanciesService: VacanciesService) {}

  @Post()
  async create(@Body() data: VacancyData) {
    return await this.vacanciesService.create(data);
  }

  @Put(':id')
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() data: UpdateVacancyDto,
  ) {
    return await this.vacanciesService.update(id, data);
  }

  @Delete(':id')
  async delete(@Param('id', ParseIntPipe) id: number) {
    return await this.vacanciesService.delete(id);
  }

  @Get(':id')
  async findnOneById(@Param('id', ParseIntPipe) id: number) {
    return await this.vacanciesService.findOneById(id);
  }

  @Get()
  async searchVacancies(@Query() query: SearchVacanciesQueryDto) {
    const { title } = query;

    return await this.vacanciesService.searchVacancies(title);
  }

  @Get('projects/:projectId')
  async findVacanciesByProjectId(@Param('projectId', ParseIntPipe) id: number) {
    return await this.vacanciesService.findVacanciesByProjectId(id);
  }
}
