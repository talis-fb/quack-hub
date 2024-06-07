import { NewsEntity } from 'src/core/notices/news/news.entity';

export abstract class NewsScrapingFacade {
  abstract getNews(): Promise<NewsEntity[]>;
}
