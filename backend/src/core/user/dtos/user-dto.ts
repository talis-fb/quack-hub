import { IsString, MinLength } from 'class-validator';
import { UserData } from '../user.entity';

export class UserDto extends UserData {
  @IsString()
  @MinLength(6)
  password: string;
}
