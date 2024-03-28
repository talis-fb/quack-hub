import { Request, Body, Controller, Post, UseGuards } from '@nestjs/common';
import { Public } from 'src/common/decorators/public.decorator';
import { AuthUserData } from './dtos/auth-user.dto';
import { AuthService } from '../auth.service';
import { ValidateInputForAuthLocal } from './guards/validate-input.guard';
import { IsEmail, IsString, MinLength } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class UserData {
  @IsEmail()
  @ApiProperty()
  email: string;

  @IsString()
  @MinLength(6)
  @ApiProperty()
  password: string;
}

@Controller('auth')
export class LoginController {
  constructor(private readonly authService: AuthService) {}

  @Public()
  @UseGuards(ValidateInputForAuthLocal)
  @Post('login')
  async login(@Request() req, @Body() _body: UserData) {
    // The real signIn is made by login.strategy.ts
    return this.authService.signIn(req.user.email, req.user.auth.password);
  }
}
