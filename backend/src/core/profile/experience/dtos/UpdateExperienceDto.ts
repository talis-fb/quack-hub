import { OmitType, PartialType } from '@nestjs/swagger';
import { ExperienceData } from 'src/core/profile/experience/experience.entity';

export class UpdateExperienceDto extends PartialType(
  OmitType(ExperienceData, ['userId', 'achievements']),
) {}
