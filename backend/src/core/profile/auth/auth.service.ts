import { Injectable, Provider } from '@nestjs/common';
import { UserEntity } from 'src/core/profile/user/user.entity';
import { AuthUserData } from 'src/core/profile/auth/login/dtos/auth-user.dto';
import { JwtService } from '@nestjs/jwt';
import { AuthRepository } from './auth.repository';
import { UserRepository } from '../user/user.repository';
import { EmailAlreadyInUseException } from './auth.exceptions';

export abstract class AuthService {
  abstract validateUser(email: string, pass: string): Promise<UserEntity>;
  abstract signJwt(email: string, id: string): Promise<{ access_token: string }>;
  abstract signUp(signupDto: AuthUserData): Promise<UserEntity>;
}

@Injectable()
export class AuthServiceImpl implements AuthService {
  constructor(
    private readonly userRepository: UserRepository,
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
    const user = await this.userRepository.getUserByEmail(authUserData.email);

    if (user) {
      throw new EmailAlreadyInUseException();
    }

    const newUser = await this.repository.createAuthUser(authUserData);

    return newUser;
  }
}

export const AuthServiceProvider: Provider = {
  provide: AuthService,
  useClass: AuthServiceImpl,
}
