import { Transform, Type } from 'class-transformer';
import {
  ArrayNotEmpty,
  IsInt,
  IsOptional,
} from 'class-validator';
import {
  StateProject,
} from 'src/core/projects/project/project.entity';

export class SearchProjectsQueryDto {
  @IsOptional()
  title?: string;

  @IsOptional()
  @IsInt()
  @Transform(({ value }) => {
    return Number(value);
  })
  userId?: number;

  //TODO: Validar se os valores passados são do tipo StateProject
  @IsOptional()
  @ArrayNotEmpty()
  states?: StateProject[];
}
