import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsString, Min, MinLength } from 'class-validator';

export class UpdateCommentDto {
  @IsString()
  @Min(1)
  @IsOptional()
  @ApiProperty()
  content?: string;
}
