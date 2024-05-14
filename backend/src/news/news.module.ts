import { Module } from '@nestjs/common';
import { NewsController } from './news.controller';
import { NewsServiceProvider } from './news.service';
import { NewsRepositoryProvider } from './news.repository';
import { HttpModule } from '@nestjs/axios';

@Module({
  imports: [
    HttpModule
  ],
  controllers: [NewsController],
  providers: [NewsServiceProvider, NewsRepositoryProvider],
})
export class NewsModule {}
