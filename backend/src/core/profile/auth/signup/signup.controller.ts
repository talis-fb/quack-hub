import { Request, Body, Controller, Post, UseGuards } from '@nestjs/common';
import { Public } from 'src/common/decorators/public.decorator';
import { AuthUserData } from '../login/dtos/auth-user.dto';
import { AuthService } from '../auth.service';
import { ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('auth')
@Controller('auth')
export class SignUpController {
  constructor(private readonly authService: AuthService) {}

  @ApiResponse({
    status: 201,
    description: 'The user account has been successfully created',
  })
  @Public()
  @Post('signup')
  async signup(@Body() signUpDto: AuthUserData) {
    return await this.authService.signUp(signUpDto);
  }
}
