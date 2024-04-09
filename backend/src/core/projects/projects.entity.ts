import { ApiProperty } from '@nestjs/swagger';
import {
  IsString,
  IsDate,
  IsOptional,
  MinLength,
  IsIn,
  IsInt,
} from 'class-validator';

export const StateProjectValues = [
  'IDLE',
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

  @IsDate()
  @ApiProperty()
  startDate: Date;

  @IsDate()
  @IsOptional()
  @ApiProperty()
  endDate: Date;

  @IsString()
  @IsOptional()
  @ApiProperty()
  methodologies: string[];
}

export class ProjectEntity extends ProjectData {
  @IsInt()
  id: number;
}
