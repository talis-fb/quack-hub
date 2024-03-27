import { IsString, MinLength } from 'class-validator';
import { UserData } from '../user.entity';

export class AuthUserData extends UserData {
  @IsString()
  @MinLength(6)
  password: string;
}
