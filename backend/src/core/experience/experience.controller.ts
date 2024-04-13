import { Body, Controller, Get, Post } from '@nestjs/common';
import { ExperienceData } from '../user/user.entity';
import { Public } from 'src/common/decorators/public.decorator';
import { ExperienceService } from './experience.service';

@Public()
@Controller('experience')
export class ExperienceController {
  constructor(private readonly experienceService: ExperienceService) {}
  @Get('')
  async findAllExperience() {
    console.log('oi!');
  }

  @Post('')
  async create(@Body() experienceData: ExperienceData) {
    return await this.experienceService.createExperience(experienceData);
  }
}
