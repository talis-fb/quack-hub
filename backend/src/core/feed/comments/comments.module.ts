import { Module } from '@nestjs/common';
import { CommentsService, CommentsServiceImpl } from './comments.service';
import { CommentsController } from './comments.controller';
import {
  CommentsRepository,
  CommentsRepositoryImpl,
} from './comments.repository';
import { PrismaService } from 'src/common/prisma/prisma.service';
import { UserRepositoryProvider } from 'src/core/profile/user/user.repository';
import { PostsRepositoryProvider } from '../posts/posts.repository';

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
    UserRepositoryProvider,
    PostsRepositoryProvider,
  ],
  controllers: [CommentsController],
})
export class CommentsModule {}
