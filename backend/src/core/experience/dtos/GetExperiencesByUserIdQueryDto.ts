import { PickType } from '@nestjs/swagger';
import { ExperienceData } from '../experience.entity';
import { ExperienceType } from '@prisma/client';

export class GetExperiencesByUserIdQueryDto extends PickType(ExperienceData, [
  'type',
]) {}
