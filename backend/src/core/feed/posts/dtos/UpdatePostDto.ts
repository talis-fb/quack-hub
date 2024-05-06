import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsString, IsUrl, MinLength } from 'class-validator';

export class UpdatePostDto {
  @IsString()
  @IsOptional()
  @MinLength(3)
  @ApiProperty()
  title?: string;

  @IsString()
  @IsOptional()
  @ApiProperty()
  content?: string;

  @IsUrl()
  @IsOptional()
  @ApiProperty()
  imageUrl: string | null;
}
