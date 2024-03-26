import { ConflictException, Injectable } from '@nestjs/common';
import { AuthService } from './impl/auth.service';
import { UserData } from 'src/core/user/user.entity';
import { SignInDto } from '../dtos/sign-in.dto';
import { SignInResponseDto } from '../dtos/sign-in-response-dto';
import { UserService } from 'src/core/user/user.service';
import { UserDto } from 'src/core/user/dtos/user-dto';

@Injectable()
export class AuthServiceImpl implements AuthService {
  constructor(private readonly userService: UserService) {}

  signIn(signinDto: SignInDto): Promise<SignInResponseDto> {
    throw new Error('Method not implemented.');
  }

  public async signUp(signupDto: UserDto): Promise<UserData> {
    const user = await this.userService.getUserByEmail(signupDto.email);

    // TODO: Verificar com talisson se precisa tirar esse throw dentro da regra de negócio auth.service

    if (user) {
      throw new ConflictException('Usuário com esse email já cadastrado.');
    }

    const newUser = await this.userService.create(signupDto);

    return newUser;
  }
}
