import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { AuthService } from './service/impl/auth.service';
import { SignInDto } from './dtos/sign-in.dto';
import { SignUpDto } from './dtos/sign-up.dto';
import { AuthGuard } from './guards/auth.guard';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  // @Post('signin')
  // async signin(@Body() signInDto: SignInDto) {
  //   return await this.authService.signIn(signInDto);
  // }

  @Post('signup')
  async signup(@Body() signUpDto: SignUpDto) {
    return await this.authService.signUp(signUpDto);
  }

  @UseGuards(AuthGuard)
  @Get()
  async teste() {
    return 'Oi';
  }
}
