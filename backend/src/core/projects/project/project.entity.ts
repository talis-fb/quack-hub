import { ApiProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import {
  IsString,
  IsDate,
  IsOptional,
  MinLength,
  IsIn,
  IsInt,
  ArrayNotEmpty,
  ValidateNested,
  IsUrl,
} from 'class-validator';
import { VacancyData } from '../vacancies/vacancies.entity';

export const StateProjectValues = [
  'PAUSED',
  'PROGRESS',
  'COMPLETED',
  'CANCELLED',
] as const;

export type StateProject = (typeof StateProjectValues)[number];

export class ProjectData {
  @IsString()
  @MinLength(3)
  @ApiProperty()
  title: string;

  @IsString()
  @MinLength(3)
  @ApiProperty()
  summary: string;

  @IsString()
  @MinLength(3)
  @ApiProperty()
  about: string;

  @IsString()
  @MinLength(3)
  @ApiProperty()
  sector: string;

  @IsIn(StateProjectValues)
  @ApiProperty()
  state: StateProject;

  @Transform(({ value }) => new Date(value))
  @IsDate()
  @ApiProperty()
  startDate: Date;

  @IsOptional()
  @Transform(({ value }) => new Date(value))
  @IsDate()
  @ApiProperty()
  endDate: Date;

  @IsInt()
  @ApiProperty()
  userId: number;

  @IsOptional()
  @ApiProperty()
  methodologies: string[];

  @IsUrl()
  @IsOptional()
  @ApiProperty()
  logoUrl: string | null;

  // @ValidateNested()
  // @ApiProperty()
  // vacancies: Array<VacancyData>;
}

export class ProjectEntity extends ProjectData {
  @IsInt()
  id: number;
}