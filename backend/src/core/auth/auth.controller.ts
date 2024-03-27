import { Request, Body, Controller, Post, UseGuards } from '@nestjs/common';
import { Public } from 'src/decorators/public.decorator';
import { UserDto } from '../user/dtos/user-dto';
import { AuthService } from './auth.service';
import { LocalAuthGuard } from './local-auth.guard';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Public()
  @UseGuards(LocalAuthGuard)
  @Post('signin')
  async signin(@Request() req) {
    return this.authService.signin(req.user);
  }

  @Public()
  @Post('signup')
  async signup(@Body() signUpDto: UserDto) {
    return await this.authService.signup(signUpDto);
  }
}
