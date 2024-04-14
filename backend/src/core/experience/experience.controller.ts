import {
  Body,
  Controller,
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
}
