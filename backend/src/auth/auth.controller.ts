import { Body, Controller, Post } from '@nestjs/common';
import { SignInDto } from './dtos/sign-in.dto';
import { AuthServiceImpl } from './service/auth-impl.service';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthServiceImpl) {}

  @Post()
  async login(@Body() signInDto: SignInDto) {}
}
