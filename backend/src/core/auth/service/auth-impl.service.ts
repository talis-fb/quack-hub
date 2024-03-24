import { ConflictException, Injectable } from '@nestjs/common';
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

  signIn(
    signinDto: SignInDto,
  ): Promise<{ access_token: string; refresh_token: string }> {
    throw new Error('Method not implemented.');
  }

  // async signIn(signinDto: SignInDto): Promise<any> {
  //   const user = await this.userService.getUserByEmail(signinDto.email);

  //   // TODO: Verificar com talisson se precisa tirar esse throw dentro da regra de negócio auth.service
  //   if (!user) throw new NotFoundException('Usuário não encontrado');

  //   if (signinDto.password !== user.password)
  //     throw new UnauthorizedException('Senha incorreta');

  //   const { accessToken } = await this.getTokens(user);

  //   return { accessToken };
  // }

  public async signUp(signupDto: SignUpDto): Promise<UserData> {
    const user = await this.userService.getUserByEmail(signupDto.email);

    // TODO: Verificar com talisson se precisa tirar esse throw dentro da regra de negócio auth.service

    if (user) {
      throw new ConflictException('Usuário com esse email já cadastrado.');
    }

    const [newUser, _] = await Promise.all([
      await this.userService.create(signupDto),
      await this.firebaseService.createUser(
        signupDto.email,
        signupDto.password,
      ),
    ]);

    return newUser;
  }

  // private async getTokens(user: UserEntity) {
  //   const accessToken = await await this.firebaseService.generateJwtToken(
  //     user.email,
  //   );

  //   return { accessToken };
  // }
}
