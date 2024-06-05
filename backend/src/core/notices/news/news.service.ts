import { Injectable, Provider } from '@nestjs/common';
import { NewsEntity } from 'src/core/notices/news/news.entity';
import { NewsScrapingFacade } from './news.scraping.facade';
export abstract class NewsService {
  abstract getNews(): Promise<NewsEntity[]>;
}

@Injectable()
export class NewsServiceImpl implements NewsService {
  constructor(private readonly newsScrapingFacade: NewsScrapingFacade) {}

  async getNews(): Promise<NewsEntity[]> {
    const output = await this.newsScrapingFacade.getNews();
    return output;
  }
}

export const NewsServiceProvider: Provider = {
  provide: NewsService,
  useClass: NewsServiceImpl,
};
