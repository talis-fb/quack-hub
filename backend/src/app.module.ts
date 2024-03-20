import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { FirebaseModule } from './firebase/firebase.module';
import { ConfigModule } from '@nestjs/config';
import { FirebaseService } from './firebase/firebase.service';

@Module({
  imports: [ConfigModule.forRoot({ cache: true }), FirebaseModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {
  constructor(private readonly firebaseService: FirebaseService) {
    console.log(this.firebaseService.getAllUsers());
  }
}
