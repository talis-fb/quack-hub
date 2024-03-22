import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { PrismaService } from '../../common/prisma/prisma.service';
import { UserRepository, UserRepositoryImpl } from './user.repository';
import { UserService } from './service/user.service';
import { UserServiceImpl } from './service/impl/user-impl.service';

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
