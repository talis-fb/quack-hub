import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './service/impl/auth.service';
import { AuthServiceImpl } from './service/auth-impl.service';

@Module({
  providers: [
    {
      provide: AuthService,
      useClass: AuthServiceImpl,
    },
  ],
  controllers: [AuthController],
})
export class AuthModule {}
