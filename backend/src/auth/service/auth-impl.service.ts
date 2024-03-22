import { Injectable } from '@nestjs/common';
import { FirebaseService } from 'src/firebase/firebase.service';
import { AuthService } from './impl/auth.service';
import { UserData } from 'src/core/user/user.entity';
import { SignInDto } from '../dtos/sign-in.dto';
import { SignUpDto } from '../dtos/sign-up.dto';

@Injectable()
export class AuthServiceImpl implements AuthService {
  constructor(private readonly firebaseService: FirebaseService) {}

  signIn(
    signinDto: SignInDto,
  ): Promise<{ access_token: string; refresh_token: string }> {
    throw new Error('Method not implemented.');
  }
  signUpDto(signupDto: SignUpDto): Promise<UserData> {
    throw new Error('Method not implemented.');
  }
}
