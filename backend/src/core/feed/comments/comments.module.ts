import { Module } from '@nestjs/common';
import { CommentsService, CommentsServiceImpl } from './comments.service';
import { CommentsController } from './comments.controller';
import {
  CommentsRepository,
  CommentsRepositoryImpl,
} from './comments.repository';
import { PrismaService } from 'src/common/prisma/prisma.service';

@Module({
  providers: [
    PrismaService,
    {
      provide: CommentsService,
      useClass: CommentsServiceImpl,
    },
    {
      provide: CommentsRepository,
      useClass: CommentsRepositoryImpl,
    },
  ],
  controllers: [CommentsController],
})
export class CommentsModule {}
