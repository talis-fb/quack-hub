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
import { ExperienceData } from '../user/user.entity';
import { Public } from 'src/common/decorators/public.decorator';
import { UpdateExperienceDto } from './dtos/UpdateExperienceDto';
import { ExperienceService } from './experience.service';

@Public()
@Controller('experience')
export class ExperienceController {
  constructor(private readonly experienceService: ExperienceService) {}
  @Get('')
  async findAllExperience() {
    console.log('oi!');
  }

  @Get(':id')
  async getExperienceById(@Param('id', ParseIntPipe) id: number) {
    return await this.experienceService.getExperienceById(id);
  }

  @Get('/user/:userId')
  async getExperienceByUserId(@Param('userId', ParseIntPipe) userId: number) {
    return await this.experienceService.getExperiencesByUserId(userId);
  }

  @Post()
  async create(@Body() experienceData: ExperienceData) {
    return await this.experienceService.createExperience(experienceData);
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
