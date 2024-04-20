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
import { ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('vacancies')
@Controller('vacancies')
export class VacanciesController {
  constructor(private readonly vacanciesService: VacanciesService) {}

  @ApiResponse({
    status: 201,
    description: 'The vacancy has been successfully created',
  })
  @Post()
  async create(@Body() data: VacancyData) {
    return await this.vacanciesService.create(data);
  }

  @ApiResponse({
    status: 200,
    description: 'The vacancy has been successfully updated',
  })
  @Put(':id')
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() data: UpdateVacancyDto,
  ) {
    return await this.vacanciesService.update(id, data);
  }

  @ApiResponse({
    status: 200,
    description: 'The vacancy has been successfully removed',
  })
  @Delete(':id')
  async delete(@Param('id', ParseIntPipe) id: number) {
    return await this.vacanciesService.delete(id);
  }

  @ApiResponse({
    status: 200,
    description: 'The vacancy has been successfully updated',
  })
  @Get(':id')
  async findnOneById(@Param('id', ParseIntPipe) id: number) {
    return await this.vacanciesService.findOneById(id);
  }

  @ApiResponse({
    status: 200,
    description: 'List of vacancies filtered by title returned successfully.',
  })
  @Get()
  async searchVacancies(@Query() query: SearchVacanciesQueryDto) {
    const { title } = query;

    return await this.vacanciesService.searchVacancies(title);
  }

  @ApiResponse({
    status: 200,
    description: 'Successfully retrieved the list of vacancies by project id.',
  })
  @Get('projects/:projectId')
  async findVacanciesByProjectId(@Param('projectId', ParseIntPipe) id: number) {
    return await this.vacanciesService.findVacanciesByProjectId(id);
  }
}
