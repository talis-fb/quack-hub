import { OmitType, PartialType } from '@nestjs/swagger';
import { ExperienceData } from 'src/core/user/user.entity';

export class UpdateExperienceDto extends PartialType(
  OmitType(ExperienceData, ['userId', 'achievements']),
) {}
