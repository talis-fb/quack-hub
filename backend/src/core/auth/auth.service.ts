import { ConflictException, Injectable, UnauthorizedException } from '@nestjs/common';
import { UserEntity } from 'src/core/user/user.entity';
import { UserService } from 'src/core/user/user.service';
import { AuthUserData } from 'src/core/user/dtos/user-dto';
import { JwtService } from '@nestjs/jwt';
import { AuthRepository } from './auth.repository';

export abstract class AuthService {
  abstract validateUser(email: string, pass: string): Promise<boolean>;
  abstract signIn(email: string, password: string): Promise<{ access_token: string }>;
  abstract signUp(signupDto: AuthUserData): Promise<UserEntity>;
}

@Injectable()
export class AuthServiceImpl implements AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
    private repository: AuthRepository,
  ) {}

  async validateUser(email: string, pass: string): Promise<boolean> {
    return await this.repository.checkAuthUser(email, pass);
  }

  async signIn(email: string, password: string) {
    const isValid = await this.repository.checkAuthUser(email, password);

    if(!isValid) 
      throw new UnauthorizedException('Credenciais inválidas');

    const user = await this.userService.getUserByEmail(email);

    return {
      access_token: this.jwtService.sign({
        email: user.email,
        sub: user.id,
      }),
    };
  }

  async signUp(authUserData: AuthUserData): Promise<UserEntity> {
    const user = await this.userService.getUserByEmail(authUserData.email);

    if (user) {
      throw new ConflictException('Usuário com esse e-mail já cadastrado.');
    }

    const newUser = await this.repository.createAuthUser(authUserData);

    return newUser;
  }
}
