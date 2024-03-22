import {
  ConflictException,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { FirebaseService } from 'src/firebase/firebase.service';
import { AuthService } from './impl/auth.service';
import { UserData, UserEntity } from 'src/core/user/user.entity';
import { SignInDto } from '../dtos/sign-in.dto';
import { SignUpDto } from '../dtos/sign-up.dto';
import { UserService } from 'src/core/user/service/user.service';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthServiceImpl implements AuthService {
  constructor(
    private readonly firebaseService: FirebaseService,
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
  ) {}

  async signIn(signinDto: SignInDto): Promise<any> {
    const user = await this.userService.getUserByEmail(signinDto.email);

    // TODO: Verificar com talisson se precisa tirar esse throw dentro da regra de negócio auth.service
    if (!user) throw new NotFoundException('Usuário não encontrado');

    const { password, ...userProfile } = user;

    if (password !== user.password)
      throw new UnauthorizedException('Senha incorreta');

    const { accessToken, refreshToken } = await this.getTokens(user);

    return { accessToken, refreshToken };
  }

  public async signUp(signupDto: SignUpDto): Promise<UserData> {
    const user = await this.userService.getUserByEmail(signupDto.email);

    // TODO: Verificar com talisson se precisa tirar esse throw dentro da regra de negócio auth.service

    if (user) {
      throw new ConflictException('Usuário com esse email já cadastrado.');
    }

    const [newUser, _] = await Promise.all([
      await this.userService.create(signupDto),
      await this.firebaseService.createUser(signupDto),
    ]);

    return newUser;
  }

  private async getTokens(user: UserEntity) {
    const payload = {
      sub: user.id,
    };

    // const [accessToken, refreshToken] = await Promise.all([
    //   await this.jwtService.signAsync(payload),
    //   await this.jwtService.signAsync(payload),
    // ]);

    const [accessToken, refreshToken] = await Promise.all([
      await this.firebaseService.generateJwtToken(user),
      await this.firebaseService.generateJwtToken(user),
    ]);

    return { accessToken, refreshToken };
  }
}
