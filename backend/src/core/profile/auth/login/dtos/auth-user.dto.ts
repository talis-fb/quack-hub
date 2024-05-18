import { IsString, MinLength } from 'class-validator';
import { InputUserData } from '../../../user/user.entity';
import { ApiProperty } from '@nestjs/swagger';

export class AuthUserData extends InputUserData {
  @IsString()
  @MinLength(6)
  @ApiProperty()
  password: string;
}
