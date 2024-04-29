import { Transform } from 'class-transformer';
import { IsInt, IsOptional } from 'class-validator';

export class SearchProjectsQueryDto {
  @IsOptional()
  title?: string;

  @IsOptional()
  @IsInt()
  @Transform(({ value }) => {
    return Number(value);
  })
  userId?: number;
}
