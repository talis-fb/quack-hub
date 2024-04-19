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
  IsArray,
  IsNotEmpty,
} from 'class-validator';

export const StateVacancy = ['OPEN', 'CLOSED', 'IN_SELECTION_PROCESS'] as const;

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

  @IsIn(StateVacancy)
  @ApiProperty()
  state: StateVacancy;
}

export class VacancyEntity extends VacancyData {
  @IsInt()
  id: number;
}
