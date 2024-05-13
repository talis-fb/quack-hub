import { ApiProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import {
  IsDate,
  IsIn,
  IsInt,
  IsNotEmpty,
  IsOptional,
  IsString,
  MinLength,
  ValidateNested,
} from 'class-validator';

export const ExperienceTypeValues = ['PROFESSIONAL', 'ACADEMIC'] as const;

export type ExperienceType = (typeof ExperienceTypeValues)[number];

export const StateExperienceValues = [
  'PAUSED',
  'PROGRESS',
  'COMPLETED',
  'CANCELLED',
] as const;

export type StateExperience = (typeof StateExperienceValues)[number];

export class ExperienceData {
  @IsString()
  @MinLength(3)
  @ApiProperty()
  title: string;

  @IsString()
  @MinLength(3)
  @ApiProperty()
  about: string;

  @IsIn(StateExperienceValues)
  @ApiProperty()
  state: StateExperience;

  @Transform(({ value }) => value ? new Date(value) : null)
  @IsDate()
  @ApiProperty()
  startDate: Date;

  @IsOptional()
  @Transform(({ value }) => (value ? new Date(value) : null))
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

  @IsOptional()
  @IsInt()
  projectId: number | null;

  constructor(partial: Partial<ExperienceData>) {
    Object.assign(this, partial);
    this.type = this.type || 'ACADEMIC';
  }
}

export class ExperienceEntity extends ExperienceData {
  @IsInt()
  id: number;
}

export class AchievementData {
  @IsString()
  @MinLength(3)
  @ApiProperty()
  title: string;

  @IsString()
  @MinLength(3)
  @ApiProperty()
  description: string;
}

export class AchievementEntity extends AchievementData {
  @IsInt()
  id: number;
}
