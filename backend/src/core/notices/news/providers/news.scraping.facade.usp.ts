import * as cheerio from 'cheerio';

import { Injectable, Provider } from '@nestjs/common';
import { NewsScrapingFacade } from '../news.scraping.facade';
import { NewsEntity } from '../news.entity';
import { HttpService } from '@nestjs/axios';

@Injectable()
export class NewsScrapingFacadeUSP implements NewsScrapingFacade {
    private url: string;

    constructor(private readonly httpService: HttpService) {
        this.url = 'https://jornal.usp.br/todas-as-noticias';
    }

    async getNews(): Promise<NewsEntity[]> {
        const news: NewsEntity[] = [];

        const output = await this.httpService.axiosRef.get(this.url, {
            responseType: 'document',
        });

        const $ = await cheerio.load(output.data);

        const newsNode = $('article.elementor-post');

        newsNode.each((index, value) => {
            try {
              const cardUspTop = $(value).children('.elementor-post__thumbnail__link');
              const imgNode = $(cardUspTop).find('img');
      
              const cardBodyWrapper = $(value).children('.elementor-post__text');
              const titleNode = $(cardBodyWrapper).find('a:first');
              const descriptionNode = $(cardBodyWrapper).find('div.elementor-post__excerpt');
      
              const imageURL = imgNode.attr().src;
              const title = titleNode.text().trim();
              const url = titleNode.attr('href');
              const description = descriptionNode.text().trim();
      
              news.push({ imageURL, title, description, url });
            } catch (error) {
              console.log({ error });
            }
          });
      
        return news;
    }
    
}

export const NewsScrapingFacadeProviderUSP: Provider = {
    provide: NewsScrapingFacade,
    useClass: NewsScrapingFacadeUSP,
  };
