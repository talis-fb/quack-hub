import { Module } from '@nestjs/common';
import { NewsController } from './news.controller';
import { NewsServiceProvider } from './news.service';
import { NewsScrapingFacadeProviderIMD } from './providers/news.scraping.facade.imd';
import { HttpModule } from '@nestjs/axios';
import { NewsScrapingFacadeProviderUSP } from './providers/news.scraping.facade.usp';
import { NewsScrapingFacadeProviderECT } from './providers/news.scraping.facade.ect';

@Module({
  imports: [
    HttpModule
  ],
  controllers: [NewsController],
  providers: [
    NewsServiceProvider, 
    NewsScrapingFacadeProviderIMD, 
    //NewsScrapingFacadeProviderUSP,
    //NewsScrapingFacadeProviderECT,
  ],
})
export class NewsModule {}
