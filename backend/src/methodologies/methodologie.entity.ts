import { ApiProperty } from '@nestjs/swagger';
import { IsString, MinLength, IsInt } from 'class-validator';

export class MethodologieData {
  @IsString()
  @MinLength(4)
  @ApiProperty()
  name: string;
}

export class MethodologieEntity extends MethodologieData {
  @IsInt()
  id: number;
}
