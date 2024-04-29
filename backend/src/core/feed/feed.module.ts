import { Module } from '@nestjs/common';
import { CommentsModule } from 'src/core/feed/comments/comments.module';
import { PostsModule } from 'src/core/feed/posts/posts.module';
import { LikesModule } from 'src/core/feed/likes/likes.module';

@Module({
  imports: [CommentsModule, PostsModule, LikesModule],
})
export class FeedModule {}
