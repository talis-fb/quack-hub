import { Module } from '@nestjs/common';
import { LikesController } from './likes.controller';
import { LikesService, LikesServiceImpl } from './likes.service';
import { PrismaService } from 'src/common/prisma/prisma.service';
import { LikesRepository, LikesRepositoryImpl } from './likes.repository';
import { UserModule } from 'src/core/profile/user/user.module';
import { PostsModule } from '../posts/posts.module';
import { UserRepositoryProvider } from 'src/core/profile/user/user.repository';
import { PostsRepositoryProvider } from '../posts/posts.repository';

@Module({
  controllers: [LikesController],
  providers: [
    PrismaService,
    UserRepositoryProvider,
    PostsRepositoryProvider,
    { provide: LikesService, useClass: LikesServiceImpl },
    { provide: LikesRepository, useClass: LikesRepositoryImpl },
  ],
})
export class LikesModule {}
