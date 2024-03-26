import { UserData } from 'src/core/user/user.entity';
import { SignInDto } from '../../dtos/sign-in.dto';
import { SignInResponseDto } from '../../dtos/sign-in-response-dto';

export abstract class AuthService {
  abstract signIn(signinDto: SignInDto): Promise<SignInResponseDto>;

  abstract signUp(signupDto: UserData): Promise<UserData>;
}
