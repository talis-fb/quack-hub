import { ApiProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import {
  IsDate,
  IsIn,
  IsInt,
  IsOptional,
  IsString,
  MinLength,
  ValidateNested,
} from 'class-validator';
import { AchievementData } from '../achievements/achievements.entity';

export const ExperienceTypeValues = ['PROFESSIONAL', 'ACADEMIC'] as const;

export type ExperienceType = (typeof ExperienceTypeValues)[number];

export class ExperienceData {
  @IsString()
  @MinLength(3)
  @ApiProperty()
  title: string;

  @IsString()
  @MinLength(3)
  @ApiProperty()
  about: string;

  @Transform(({ value }) => new Date(value))
  @IsDate()
  @ApiProperty()
  startDate: Date;

  @IsOptional()
  @Transform(({ value }) => new Date(value))
  @IsDate()
  @ApiProperty()
  endDate: Date | null;

  @IsIn(ExperienceTypeValues)
  @ApiProperty()
  type: ExperienceType;

  @ValidateNested()
  @ApiProperty()
  achievements: Array<AchievementData>;

  @IsInt()
  userId: number;

  @IsInt()
  projectId: number;
}

export class ExperienceEntity extends ExperienceData {
  @IsInt()
  id: number;
}
