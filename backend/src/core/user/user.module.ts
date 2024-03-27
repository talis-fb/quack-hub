import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { PrismaService } from '../../common/prisma/prisma.service';
import { UserRepository, UserRepositoryImpl } from './user.repository';
import { UserService, UserServiceImpl } from './user.service';

@Module({
  controllers: [UserController],
  providers: [
    {
      provide: UserService,
      useClass: UserServiceImpl,
    },
    PrismaService,
    { provide: UserRepository, useClass: UserRepositoryImpl },
  ],
  exports: [UserService],
})
export class UserModule {}
