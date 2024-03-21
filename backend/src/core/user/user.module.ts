import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { PrismaService } from '../../common/prisma/prisma.service';
import { UserRepository, UserRepositoryImpl } from './user.repository';

@Module({
  controllers: [UserController],
  providers: [
    UserService,
    PrismaService,
    { provide: UserRepository, useClass: UserRepositoryImpl },
  ],
})
export class UserModule {}
