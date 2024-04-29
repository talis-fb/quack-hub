import { ApiProperty } from '@nestjs/swagger';
import { ExperienceTypeValues } from 'src/core/profile/experience/experience.entity';
import { ExperienceType } from '@prisma/client';
import { IsIn, IsOptional } from 'class-validator';

export class GetExperiencesByUserIdQueryDto {
  @IsOptional()
  @IsIn(ExperienceTypeValues)
  @ApiProperty()
  type?: ExperienceType;
}
