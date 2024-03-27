import { ConflictException, Injectable } from '@nestjs/common';
import { UserEntity } from 'src/core/user/user.entity';
import { UserService } from 'src/core/user/user.service';
import { UserDto } from 'src/core/user/dtos/user-dto';
import { JwtService } from '@nestjs/jwt';

export abstract class AuthService {
  abstract validateUser(
    email: string,
    pass: string,
  ): Promise<Omit<UserEntity, 'password'>>;

  abstract signin(
    user: Omit<UserEntity, 'password'>,
  ): Promise<{ access_token: string }>;

  abstract signup(signupDto: UserDto): Promise<UserEntity>;
}

@Injectable()
export class AuthServiceImpl implements AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
  ) {}

  async validateUser(
    email: string,
    pass: string,
  ): Promise<Omit<UserEntity, 'password'>> {
    const user = await this.userService.getUserByEmail(email);

    if (user && user.password === pass) {
      const { password, ...result } = user;

      return result;
    }

    return null;
  }

  async signin(user: Omit<UserEntity, 'password'>) {
    const payload = { email: user.email, sub: user.id };

    return {
      access_token: this.jwtService.sign(payload),
    };
  }

  async signup(signupDto: UserDto): Promise<UserEntity> {
    const user = await this.userService.getUserByEmail(signupDto.email);

    if (user) {
      throw new ConflictException('Usuário com esse e-mail já cadastrado.');
    }

    const newUser = await this.userService.create(signupDto);

    return newUser;
  }
}
