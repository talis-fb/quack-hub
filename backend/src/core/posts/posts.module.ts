import { Module } from '@nestjs/common';
import { PostsController } from './posts.controller';
import { PostsService, PostsServiceImpl } from './posts.service';
import { PostsRepository, PostsRepositoryImpl } from './posts.repository';
import { PrismaService } from 'src/common/prisma/prisma.service';

@Module({
  controllers: [PostsController],
  providers: [
    PrismaService,
    {
      provide: PostsService,
      useClass: PostsServiceImpl,
    },
    {
      provide: PostsRepository,
      useClass: PostsRepositoryImpl,
    },
  ],
})
export class PostsModule {}
