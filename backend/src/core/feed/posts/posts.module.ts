import { Module } from '@nestjs/common';
import { PostsController } from './posts.controller';
import { PostServiceProvider, PostsService } from './posts.service';
import { PostsRepositoryProvider } from './posts.repository';
import { PrismaService } from 'src/common/prisma/prisma.service';
import { UserRepositoryProvider } from 'src/core/profile/user/user.repository';

@Module({
  controllers: [PostsController],
  providers: [
    PrismaService,
    PostServiceProvider,
    PostsRepositoryProvider,
    UserRepositoryProvider,
  ],
})
export class PostsModule {}
