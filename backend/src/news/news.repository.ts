import * as cheerio from 'cheerio';

import { Injectable, Provider } from '@nestjs/common';
import { NewsEntity } from 'src/news/news.entity';
import { HttpService } from '@nestjs/axios';
import { firstValueFrom, lastValueFrom } from 'rxjs';

export abstract class NewsRepository {
  abstract getNews(): Promise<NewsEntity[]>;
}

@Injectable()
export class NewsRepositoryImpl implements NewsRepository {
  private url: string;

  constructor(private readonly httpService: HttpService) {
    this.url = 'https://www.metropoledigital.ufrn.br/portal/noticias';
  }

  async getNews(): Promise<NewsEntity[]> {
    const news: NewsEntity[] = [];

    const output = await this.httpService.axiosRef.get(this.url, {
      responseType: 'document',
    });

    const $ = await cheerio.load(output.data);

    const newsNode = $('div.card-noticia ');

    newsNode.each((index, value) => {
      try {
        const cardImdTop = $(value).children('.card-img-top');
        const imgNode = $(cardImdTop).find('img');

        const cardBodyWrapper = $(value).children('.card-body-wrapper');
        const titleNode = $(cardBodyWrapper).find('a:first');
        const descriptionNode = cardBodyWrapper.find('a:last');

        const imageURL = imgNode.attr().src;
        const title = titleNode.text();
        const url =
          'https://www.metropoledigital.ufrn.br' + titleNode.attr().href;
        const description = descriptionNode.text();

        news.push({ imageURL, title, description, url });
      } catch (error) {
        console.log({ error });
      }
    });

    return news;
  }
}

export const NewsRepositoryProvider: Provider = {
  provide: NewsRepository,
  useClass: NewsRepositoryImpl,
};
