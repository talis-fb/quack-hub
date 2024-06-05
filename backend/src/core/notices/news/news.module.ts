import { Module } from '@nestjs/common';
import { NewsController } from './news.controller';
import { NewsServiceProvider } from './news.service';
import { NewsScrapingFacadeProvider } from './news.scraping.facade';
import { HttpModule } from '@nestjs/axios';

@Module({
  imports: [
    HttpModule
  ],
  controllers: [NewsController],
  providers: [NewsServiceProvider, NewsScrapingFacadeProvider],
})
export class NewsModule {}
