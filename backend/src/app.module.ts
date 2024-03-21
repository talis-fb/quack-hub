import { Module } from '@nestjs/common';
import { UserModule } from 'src/core/user/user.module';

@Module({
  imports: [UserModule],
})
export class AppModule {}
