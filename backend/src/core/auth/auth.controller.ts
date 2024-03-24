import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { AuthService } from './service/impl/auth.service';
import { SignUpDto } from './dtos/sign-up.dto';
import { Public } from 'src/decorators/public.decorator';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  // @Post('signin')
  // async signin(@Body() signInDto: SignInDto) {
  //   return await this.authService.signIn(signInDto);
  // }

  @Public()
  @Post('signup')
  async signup(@Body() signUpDto: SignUpDto) {
    return await this.authService.signUp(signUpDto);
  }

  @Get()
  async teste() {
    return 'Oi';
  }
}
