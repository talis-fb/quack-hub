import { ApiProperty } from '@nestjs/swagger';
import { IsInt, IsString, Min } from 'class-validator';

export class CreateCommentDto {
  @IsString()
  @Min(1)
  @ApiProperty()
  content: string;

  @IsInt()
  postId: number;
}
