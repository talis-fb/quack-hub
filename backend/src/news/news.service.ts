import { Injectable, Provider } from '@nestjs/common';
import * as cheerio from 'cheerio';
import { NewsEntity } from 'src/news/news.entity';
import { NewsRepository } from './news.repository';
export abstract class NewsService {
  abstract getNews(): Promise<NewsEntity[]>;
}

@Injectable()
export class NewsServiceImpl implements NewsService {
  constructor(private readonly newsRepository: NewsRepository) {}

  async getNews(): Promise<NewsEntity[]> {
    const output = await this.newsRepository.getNews();
    return output;
  }
}

export const NewsServiceProvider: Provider = {
  provide: NewsService,
  useClass: NewsServiceImpl,
};
