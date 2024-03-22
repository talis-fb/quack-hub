import { Module } from '@nestjs/common';
import { AuthService } from './service/impl/auth.service';
import { AuthServiceImpl } from './service/auth-impl.service';
import { FirebaseModule } from 'src/firebase/firebase.module';
import { AuthController } from './auth.controller';

@Module({
  imports: [FirebaseModule],
  controllers: [AuthController],
  providers: [
    {
      provide: AuthService,
      useClass: AuthServiceImpl,
    },
  ],
})
export class AuthModule {}
