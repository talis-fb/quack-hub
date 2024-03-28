import { IsString, MinLength } from 'class-validator';
import { UserData } from '../../../user/user.entity';
import { ApiProperty } from '@nestjs/swagger';

export class AuthUserData extends UserData {
  @IsString()
  @MinLength(6)
  @ApiProperty()
  password: string;
}
