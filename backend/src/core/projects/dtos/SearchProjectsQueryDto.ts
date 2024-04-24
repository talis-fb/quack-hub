import { IsInt, IsOptional } from 'class-validator';

export class SearchProjectsQueryDto {
  @IsOptional()
  title?: string;

  @IsOptional()
  @IsInt()
  userId?: number;
}
