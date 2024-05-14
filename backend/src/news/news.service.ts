import { Injectable, Provider } from '@nestjs/common';
import * as cheerio from 'cheerio';
export abstract class NewsService {
  abstract getNews(): Promise<
    {
      title: string;
      description: string;
      url: string;
      imageURL: string;
    }[]
  >;
}

@Injectable()
export class NewsServiceImpl implements NewsService {
  async getNews(): Promise<
    {
      title: string;
      description: string;
      url: string;
      imageURL: string;
    }[]
  > {
    const news: {
      title: string;
      description: string;
      url: string;
      imageURL: string;
    }[] = [];
    const output = await fetch(
      'https://www.metropoledigital.ufrn.br/portal/noticias',
    );

    const page = await output.text();

    const $ = await cheerio.load(page);

    const newsNode = $('div.card-noticia ');

    newsNode.each((index, value) => {
      const cardImdTop = $(value).children('.card-img-top');
      const imgNode = $(cardImdTop).find('img');

      const cardBodyWrapper = $(value).children('.card-body-wrapper');
      const titleNode = $(cardBodyWrapper).find('a:first');
      const descriptionNode = cardBodyWrapper.find('a:last');

      const imageURL = imgNode.attr().src;
      const title = titleNode.text();
      const url = 'https://www.metropoledigital.ufrn.br' +  titleNode.attr().href;
      const description = descriptionNode.text();

      news.push({ imageURL, title, description, url });
    });

    return news;
  }
}

export const NewsServiceProvider: Provider = {
  provide: NewsService,
  useClass: NewsServiceImpl,
};
