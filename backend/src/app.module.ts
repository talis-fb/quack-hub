import { join } from 'path';
import { Module } from '@nestjs/common';
import { FeedModule } from 'src/core/feed/feed.module';
import { ProjectsModule } from 'src/core/projects/projects.module';
import { ProfileModule } from 'src/core/profile/profile.module';
import { ServeStaticModule } from '@nestjs/serve-static';
import { ThrottlerModule } from '@nestjs/throttler';
import { NewsModule } from 'src/news/news.module';
import { NoticeModule } from './notice/notice.module';



@Module({
  imports: [
    // Static Frontend
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'client'),
    }),

    // Rate Limit
    ThrottlerModule.forRoot([
      {
        ttl: 60,
        limit: 10,
      },
    ]),

    FeedModule,
    ProjectsModule,
    ProfileModule,
    NewsModule,
    NoticeModule,
  ],
})
export class AppModule {}
