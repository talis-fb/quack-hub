import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './service/impl/auth.service';
import { SignInDto } from './dtos/sign-in.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('signin')
  async signin(@Body() signInDto: SignInDto) {
    return 'SIGNIN !';
  }
}
