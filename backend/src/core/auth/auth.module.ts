import { Module } from '@nestjs/common';
import { AuthService, AuthServiceImpl } from './auth.service';
import { UserModule } from '../user/user.module';
import { APP_GUARD } from '@nestjs/core';
import { JwtModule } from '@nestjs/jwt';
import { jwtConstants } from './constants';
import { JwtAuthGuard } from './jwt/jwt.guard';
import { LoginPassportStrategy } from './login/login.strategy';
import { AuthRepository, AuthRepositoryImpl } from './auth.repository';
import { PrismaService } from 'src/common/prisma/prisma.service';
import { LoginController } from './login/login.controller';
import { SignUpController } from './signup/signup.controller';
import { JwtPassportStrategy } from './jwt/jwt.strategy';
import { ValidateInputForAuthLocal } from './login/guards/validate-input.guard';

@Module({
  imports: [
    UserModule,
    JwtModule.register({
      secret: jwtConstants.secret,
      signOptions: { expiresIn: '1d' },
    }),
  ],
  providers: [
    {
      provide: AuthService,
      useClass: AuthServiceImpl,
    },
    {
      provide: AuthRepository,
      useClass: AuthRepositoryImpl,
    },
    LoginPassportStrategy,
    JwtPassportStrategy,
    PrismaService,
    ValidateInputForAuthLocal,

    // Define this as a Global module so that it can be used in all controllers
    {
      provide: APP_GUARD,
      useClass: JwtAuthGuard,
    },
  ],
  controllers: [LoginController, SignUpController],
})
export class AuthModule {}
