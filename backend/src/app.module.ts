import { Module } from '@nestjs/common';
import { UserModule } from 'src/core/user/user.module';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from './core/auth/auth.module';

@Module({
  imports: [
    ConfigModule.forRoot({ cache: true, load: [] }),
    UserModule,
    AuthModule,
  ],
})
export class AppModule {}
