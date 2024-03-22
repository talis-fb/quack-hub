import { Module } from '@nestjs/common';
import { AuthService } from './service/impl/auth.service';
import { AuthServiceImpl } from './service/auth-impl.service';
import { FirebaseModule } from 'src/firebase/firebase.module';
import { AuthController } from './auth.controller';
import { UserModule } from '../user/user.module';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [
    FirebaseModule,
    UserModule,
    JwtModule.register({
      global: true,
      secret: '99ca7478-da68-4e6c-b38c-0250578e2455',
    }),
  ],
  controllers: [AuthController],
  providers: [
    {
      provide: AuthService,
      useClass: AuthServiceImpl,
    },
  ],
})
export class AuthModule {}
