import { Body, Controller, Post } from '@nestjs/common';
import { SignInDto } from './dtos/sign-in.dto';

@Controller('auth')
export class AuthController {
    @Post()
    async login(@Body() signInDto: SignInDto) {
        return email;
    }
}
