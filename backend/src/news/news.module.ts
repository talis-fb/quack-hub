import { Module } from '@nestjs/common';
import { NewsController } from './news.controller';
import { NewsServiceProvider } from './news.service';
import { NewsRepositoryProvider } from './news.repository';

@Module({
  controllers: [NewsController],
  providers: [NewsServiceProvider, NewsRepositoryProvider],
})
export class NewsModule {}
