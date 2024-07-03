import { Module } from '@nestjs/common';
import { NewsController } from './news.controller';
import { NewsServiceProvider } from './news.service';
import { HttpModule } from '@nestjs/axios';
import { NewsScrapingFacade } from './news.scraping.facade';
import { ContextFactory } from 'src/factory/factories/context.factory';
import { FactoryModule } from 'src/factory/factory.module';

@Module({
  imports: [HttpModule, FactoryModule],
  controllers: [NewsController],
  providers: [
    NewsServiceProvider,
    {
      provide: NewsScrapingFacade,
      useFactory: (contextFactory: ContextFactory) => {
        return contextFactory.createNewsScrapingFacade();
      },
      inject: [ContextFactory],
    },
  ],
})
export class NewsModule {}
