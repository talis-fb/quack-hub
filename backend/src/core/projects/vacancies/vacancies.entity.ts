import { ApiProperty } from '@nestjs/swagger';
import {
  IsString,
  IsOptional,
  MinLength,
  IsIn,
  IsInt,
  ArrayNotEmpty,
  IsDate,
  IsNumber,
} from 'class-validator';

export const StateVacancy = ['PAUSED', 'CLOSED', 'PROGRESS'] as const;

export type StateVacancy = (typeof StateVacancy)[number];

export class VacancyData {
  @IsString()
  @MinLength(3)
  @ApiProperty()
  title: string;

  @IsString()
  @MinLength(10)
  @ApiProperty()
  description: string;

  @IsOptional()
  @ArrayNotEmpty()
  @ApiProperty()
  requirements: string[];

  @IsOptional()
  @ApiProperty()
  @IsNumber()
  salary?: number;

  @IsIn(StateVacancy)
  @ApiProperty()
  state: StateVacancy;

  @IsInt()
  projectId: number;
}

export class VacancyEntity extends VacancyData {
  @IsInt()
  id: number;

  @IsDate()
  createdAt: Date;

  @IsDate()
  updatedAt: Date;
}
