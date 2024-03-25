import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './service/impl/AuthService';
import { Public } from 'src/decorators/public.decorator';
import { UserDto } from '../user/dtos/user-dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Public()
  @Post('signup')
  async signup(@Body() signUpDto: UserDto) {
    return await this.authService.signUp(signUpDto);
  }
}
