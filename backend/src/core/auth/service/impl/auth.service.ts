import { UserData } from 'src/core/user/user.entity';
import { SignInDto } from '../../dtos/sign-in.dto';
import { SignUpDto } from '../../dtos/sign-up.dto';

export abstract class AuthService {
  abstract signIn(
    signinDto: SignInDto,
  ): Promise<{ access_token: string; refresh_token: string }>;

  abstract signUp(signupDto: SignUpDto): Promise<UserData>;
}
