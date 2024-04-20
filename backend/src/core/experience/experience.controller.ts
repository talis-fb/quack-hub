import {
  Body,
  Controller,
  Delete,
  Get,
  NotFoundException,
  Param,
  ParseIntPipe,
  Post,
  Put,
  Query,
  Req,
} from '@nestjs/common';

import { Public } from 'src/common/decorators/public.decorator';
import { UpdateExperienceDto } from './dtos/UpdateExperienceDto';
import { ExperienceService } from './experience.service';
import { GetExperiencesByUserIdQueryDto } from './dtos/GetExperiencesByUserIdQueryDto';
import { CreateExperienceDto } from './dtos/CreateExperienceDto';
import { ApiTags } from '@nestjs/swagger';

// @Public()
@ApiTags('experience')
@Controller('experience')
export class ExperienceController {
  constructor(private readonly experienceService: ExperienceService) {}

  @Get(':id')
  async getExperienceById(@Param('id', ParseIntPipe) id: number) {
    const resExperience = await this.experienceService.getExperienceById(id);
    if (!resExperience) {
      throw new NotFoundException(`User with ID ${id} not found!`);
    }
    return resExperience;
  }

  @Get('/user/:userId')
  async getExperienceByUserId(
    @Param('userId', ParseIntPipe) userId: number,
    @Query() query: GetExperiencesByUserIdQueryDto,
  ) {
    const { type } = query;

    return await this.experienceService.getExperiencesByUserId(userId, type);
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
