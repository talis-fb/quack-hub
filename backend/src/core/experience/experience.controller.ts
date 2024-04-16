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
  Req,
} from '@nestjs/common';

import {
  ExperienceData,
  ExperienceType,
} from '../experience/experience.entity';

import { Public } from 'src/common/decorators/public.decorator';
import { UpdateExperienceDto } from './dtos/UpdateExperienceDto';
import { ExperienceService } from './experience.service';
import { GetExperiencesByUserIdQueryDto } from './dtos/GetExperiencesByUserIdQueryDto';
import { CreateExperienceDto } from './dtos/CreateExperienceDto';

// @Public()
@Controller('experience')
export class ExperienceController {
  constructor(private readonly experienceService: ExperienceService) {}

  @Get(':id')
  async getExperienceById(@Param('id', ParseIntPipe) id: number) {
    return await this.experienceService.getExperienceById(id);
  }

  @Get('/user/:userId')
  async getExperienceByUserId(@Param('userId', ParseIntPipe) userId: number) {
    return await this.experienceService.getExperiencesByUserId(userId);
  }

  @Get('/type/:userId')
  async getExperiencesUserByType(
    @Param('userId', ParseIntPipe) userId: number,
    @Query() query: GetExperiencesByUserIdQueryDto,
  ) {
    const { type } = query;

    return await this.experienceService.getExperiencesUserByType(userId, type);
  }

  @Post()
  async create(@Req() req, @Body() createExperienceDto: CreateExperienceDto) {
    const { userId } = req.user;

    return await this.experienceService.createExperience({
      ...createExperienceDto,
      userId,
    });
  }

  @Put(':id')
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateExperienceDto: UpdateExperienceDto,
  ) {
    return await this.experienceService.updateExperience(
      id,
      updateExperienceDto,
    );
  }

  @Delete(':id')
  async delete(@Param('id', ParseIntPipe) id: number) {
    return await this.experienceService.deleteExperience(id);
  }
}
