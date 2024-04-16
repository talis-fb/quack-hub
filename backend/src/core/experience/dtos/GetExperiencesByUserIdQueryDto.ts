import { PickType, PartialType, ApiProperty } from '@nestjs/swagger';
import { ExperienceData, ExperienceTypeValues } from '../experience.entity';
import { ExperienceType } from '@prisma/client';
import { IsIn, IsOptional } from 'class-validator';

// export class GetExperiencesByUserIdQueryDto extends PickType(ExperienceData, [
//   'type',
// ]) {}


export class GetExperiencesByUserIdQueryDto{
  @IsOptional()
  @IsIn(ExperienceTypeValues)
  @ApiProperty()
  type?: ExperienceType;
}