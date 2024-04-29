import { Module } from '@nestjs/common';
import { UserController } from 'src/core/profile/user/user.controller';
import { UserServiceProvider } from 'src/core/profile/user/user.service';
import { PrismaService } from 'src/common/prisma/prisma.service';
import { UserRepositoryProvider } from 'src/core/profile/user/user.repository';

@Module({
  controllers: [UserController],
  providers: [
    UserServiceProvider,
    PrismaService,
    UserRepositoryProvider,
  ],
})
export class UserModule {}
