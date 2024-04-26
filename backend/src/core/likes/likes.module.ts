import { Module } from '@nestjs/common';
import { LikesController } from './likes.controller';
import { LikesService, LikesServiceImpl } from './likes.service';
import { PrismaService } from 'src/common/prisma/prisma.service';
import { LikesRepository, LikesRepositoryImpl } from './likes.repository';
import { UserModule } from '../user/user.module';

@Module({
  imports: [UserModule],
  controllers: [LikesController],
  providers: [
    PrismaService,
    { provide: LikesService, useClass: LikesServiceImpl },
    { provide: LikesRepository, useClass: LikesRepositoryImpl },
  ],
})
export class LikesModule {}
