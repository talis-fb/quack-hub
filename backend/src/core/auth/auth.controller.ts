import { Request, Body, Controller, Post, UseGuards } from '@nestjs/common';
import { Public } from 'src/decorators/public.decorator';
import { AuthUserData } from '../user/dtos/user-dto';
import { AuthService } from './auth.service';
import { LocalAuthGuard } from './local-auth.guard';
import { SignInDto } from './dtos/sign-in.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Public()
  @UseGuards(LocalAuthGuard)
  @Post('signin')
  async signin(@Body() body: SignInDto) {
    return this.authService.signIn(body.email, body.password);
  }

  @Public()
  @Post('signup')
  async signup(@Body() signUpDto: AuthUserData) {
    return await this.authService.signUp(signUpDto);
  }
}
