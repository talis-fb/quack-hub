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

import { Public } from 'src/common/decorators/public.decorator';
import { UpdateExperienceDto } from 'src/core/profile/experience/dtos/UpdateExperienceDto';
import { ExperienceService } from 'src/core/profile/experience/experience.service';
import { GetExperiencesByUserIdQueryDto } from 'src/core/profile/experience/dtos/GetExperiencesByUserIdQueryDto';
import { CreateExperienceDto } from 'src/core/profile/experience/dtos/CreateExperienceDto';
import { ApiTags } from '@nestjs/swagger';
import { NotFoundExperienceException } from 'src/core/profile/experience/experience.exceptions';

@Public()
@ApiTags('experience')
@Controller('experience')
export class ExperienceController {
  constructor(private readonly experienceService: ExperienceService) {}

  @Get(':id')
  async getExperienceById(@Param('id', ParseIntPipe) id: number) {
    const resExperience = await this.experienceService.getExperienceById(id);

    if (!resExperience) {
      throw new NotFoundExperienceException();
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

    return await this.experienceService.createExperience(
      createExperienceDto,
      userId,
    );
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
