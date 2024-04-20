import { ApiProperty } from '@nestjs/swagger';
import { IsOptional } from 'class-validator';

export class SearchVacanciesQueryDto {
  @IsOptional()
  @ApiProperty()
  title?: string;
}
