import { PickType } from '@nestjs/mapped-types';
import { IsString, MinLength } from 'class-validator';

import { UserData } from 'src/core/user/user.entity';

export class SignInDto extends PickType(UserData, ['email']) {
  @IsString()
  @MinLength(6)
  password: string;
}
