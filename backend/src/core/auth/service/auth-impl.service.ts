import { Injectable, NotFoundException } from '@nestjs/common';
import { FirebaseService } from 'src/firebase/firebase.service';
import { AuthService } from './impl/auth.service';
import { UserData } from 'src/core/user/user.entity';
import { SignInDto } from '../dtos/sign-in.dto';
import { SignUpDto } from '../dtos/sign-up.dto';
import { UserService } from 'src/core/user/service/user.service';

@Injectable()
export class AuthServiceImpl implements AuthService {
  constructor(
    private readonly firebaseService: FirebaseService,
    private readonly userService: UserService,
  ) {}

  public async signIn(
    signinDto: SignInDto,
  ): Promise<{ access_token: string; refresh_token: string }> {
    const { email, password } = signinDto;

    const user = await this.userService.getUserByEmail(email);

    // TODO: Verificar com talisson se precisa tirar esse throw dentro da regra de negócio auth.service
    if (!user) {
      throw new NotFoundException('Nenhum usuário encontrado com esse email.');
    }

    return {
      access_token: '',
      refresh_token: '',
    };
  }
  public async signUp(signupDto: SignUpDto): Promise<UserData> {
    throw new Error('Method not implemented.');
  }
}
