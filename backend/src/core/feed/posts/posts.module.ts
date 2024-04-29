import { Module } from '@nestjs/common';
import { PostsController } from './posts.controller';
import { PostServiceProvider, PostsService } from './posts.service';
import { PostsRepositoryProvider } from './posts.repository';
import { PrismaService } from 'src/common/prisma/prisma.service';

@Module({
  controllers: [PostsController],
  providers: [PrismaService, PostServiceProvider, PostsRepositoryProvider],
})
export class PostsModule {}
