import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsString, IsUrl, MinLength } from 'class-validator';

export class CreatePostDto {
  @IsString()
  @MinLength(3)
  @ApiProperty()
  title: string;

  @IsString()
  @ApiProperty()
  content: string;

  @IsUrl()
  @IsOptional()
  @ApiProperty()
  imageUrl: string | null;
}
