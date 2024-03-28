import { ConflictException, Injectable } from '@nestjs/common';
import { UserEntity } from 'src/core/user/user.entity';
import { UserService } from 'src/core/user/user.service';
import { AuthUserData } from './login/dtos/auth-user.dto';
import { JwtService } from '@nestjs/jwt';
import { AuthRepository } from './auth.repository';

export abstract class AuthService {
  abstract validateUser(email: string, pass: string): Promise<UserEntity>;
  abstract signJwt(email: string, id: string): Promise<{ access_token: string }>;
  abstract signUp(signupDto: AuthUserData): Promise<UserEntity>;
}

@Injectable()
export class AuthServiceImpl implements AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
    private repository: AuthRepository,
  ) {}

  async validateUser(email: string, pass: string): Promise<UserEntity> {
    return await this.repository.findAuthUser(email, pass);
  }

  async signJwt(email: string, id: string): Promise<{ access_token: string }> {
    const payload = {
      email: email,
      sub: id,
    }

    return {
      access_token: await this.jwtService.signAsync(payload),
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
