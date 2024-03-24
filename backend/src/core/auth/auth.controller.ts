import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { AuthService } from './service/impl/auth.service';
import { Public } from 'src/decorators/public.decorator';
import { UserData } from '../user/user.entity';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Public()
  @Post('signup')
  async signup(@Body() signUpDto: UserData) {
    return await this.authService.signUp(signUpDto);
  }
}
