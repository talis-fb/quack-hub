import { join } from 'path';
import { Module } from '@nestjs/common';
import { FeedModule } from 'src/core/feed/feed.module';
import { ProjectsModule } from 'src/core/projects/projects.module';
import { ProfileModule } from 'src/core/profile/profile.module';
import { ServeStaticModule } from '@nestjs/serve-static';
import { ThrottlerModule } from '@nestjs/throttler';
import {
  NewsService,
  NewsServiceImpl,
  NewsServiceProvider,
} from 'src/news/news.service';
import { NewsController } from './news/news.controller';
import { NewsModule } from './news/news.module';

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
  ],
  providers: [NewsServiceProvider],
  controllers: [NewsController],
})
export class AppModule {
  constructor(private readonly newsService: NewsService) {
    this.newsService.getNews();
  }
}
