import { Request, Body, Controller, Post, UseGuards } from '@nestjs/common';
import { Public } from 'src/common/decorators/public.decorator';
import { AuthService } from '../auth.service';
import { ValidateInputForAuthLocal } from './guards/validate-input.guard';
import { SignInDto } from './dtos/sign-in.dto';


@Controller('auth')
export class LoginController {
  constructor(private readonly authService: AuthService) {}

  @Public()
  @UseGuards(ValidateInputForAuthLocal)
  @Post('login')
  async login(@Request() req, @Body() _body: SignInDto) {
    return await this.authService.signJwt(req.user.email, req.user.id);
  }
}
