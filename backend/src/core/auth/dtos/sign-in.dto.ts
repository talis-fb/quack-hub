import { PickType } from '@nestjs/mapped-types';

import { UserData } from 'src/core/user/user.entity';

export class SignInDto extends PickType(UserData, ['email', 'password']) {}
