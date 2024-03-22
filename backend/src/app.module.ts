import { Module } from '@nestjs/common';
import { UserModule } from 'src/core/user/user.module';
import { FirebaseModule } from './firebase/firebase.module';
import { ConfigModule } from '@nestjs/config';
import { FirebaseService } from './firebase/firebase.service';
import firebaseConfig from './config/firebase-config';
import { AuthModule } from './core/auth/auth.module';


@Module({
  imports: [
    ConfigModule.forRoot({ cache: true, load: [firebaseConfig] }),
    FirebaseModule,
    UserModule,
    AuthModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {
  constructor(private readonly firebaseService: FirebaseService) {
    console.log(this.firebaseService.getAllUsers());
  }
}
