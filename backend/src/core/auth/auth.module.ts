import { Module } from '@nestjs/common';
import { AuthService, AuthServiceImpl } from './auth.service';
import { AuthController } from './auth.controller';
import { UserModule } from '../user/user.module';
import { APP_GUARD } from '@nestjs/core';
import { JwtModule } from '@nestjs/jwt';
import { jwtConstants } from './constants';
import { JwtStrategy } from './jwt-strategy/jwt-strategy';
import { JwtAuthGuard } from './jwt-auth.guard';
import { LocalStrategy } from './local-strategy/local-stratey';
import { AuthRepository, AuthRepositoryImpl } from './auth.repository';
import { PrismaService } from 'src/common/prisma/prisma.service';

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
    LocalStrategy,
    JwtStrategy,
    PrismaService,
    {
      provide: APP_GUARD,
      useClass: JwtAuthGuard,
    },
  ],
  controllers: [AuthController],
})
export class AuthModule {}
