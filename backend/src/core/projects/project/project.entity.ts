import { ApiProperty } from '@nestjs/swagger';
import { Transform, Type } from 'class-transformer';
import {
  IsString,
  IsDate,
  IsOptional,
  MinLength,
  IsIn,
  IsInt,
  ValidateNested,
  IsUrl,
} from 'class-validator';
import {
  MethodologieData,
  MethodologieEntity,
} from 'src/core/methodologies/methodologie.entity';

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

  @Transform(({ value }) => (value ? new Date(value) : null))
  @IsDate()
  @ApiProperty()
  startDate: Date;

  @IsOptional()
  @Transform(({ value }) => (value ? new Date(value) : null))
  @IsDate()
  @ApiProperty()
  endDate: Date | null;

  @IsUrl()
  @IsOptional()
  @ApiProperty()
  logoUrl: string | null;

  constructor(partial: Partial<InputProjectData>) {
    Object.assign(this, partial);
    
  }

  // @ValidateNested()
  // @ApiProperty()
  // vacancies: Array<VacancyData>;
}

export class OutputProjectData extends ProjectData {
  @IsInt()
  @ApiProperty()
  userId: number;

  @ValidateNested()
  @Type(() => MethodologieEntity)
  @ApiProperty()
  methodologies: MethodologieEntity[];
}

export class InputProjectData extends ProjectData {
  @ValidateNested()
  @ApiProperty()
  methodologies: {
    id: number;
  }[];

  constructor(partial: Partial<InputProjectData>) {
    super(partial);

    this.methodologies = this.methodologies || [];
  }
}

export class ProjectEntity extends OutputProjectData {
  @IsInt()
  id: number;
}
