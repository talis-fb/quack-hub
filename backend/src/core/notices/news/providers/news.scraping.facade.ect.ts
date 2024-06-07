import * as cheerio from "cheerio";

import { Injectable, Provider } from "@nestjs/common";
import { NewsScrapingFacade } from "../news.scraping.facade";
import { NewsEntity } from "../news.entity";
import { HttpService } from "@nestjs/axios";

@Injectable()
export class NewsScrapingFacadeECT implements NewsScrapingFacade {
  private url: string;
  
  constructor(private readonly httpService: HttpService) {
      this.url = 'https://www.ect.ufrn.br/category/noticias/';
  }

  async getNews(): Promise<NewsEntity[]> {
      const news: NewsEntity[] = [];

      const output = await this.httpService.axiosRef.get(this.url, {
          responseType: 'document',
      });

      const $ = cheerio.load(output.data);

      const newsNode = $('div.news__box');

      newsNode.each((index, value) => {
          try {
              const imgNode = $(value).find('img');
              const titleNode = $(value).find('span');
              const descriptionNode = $(value).find('div.post-excerpt');

              const imageURL = imgNode.attr().src;
              const title = titleNode.text();
              const description = descriptionNode.text().trim();
              const url = titleNode.parent().attr('href');

              news.push({ imageURL, title, description, url });
          } catch (error) {
              console.log({ error });
          }
      });

      return news;
  }

}

export const NewsScrapingFacadeProviderECT: Provider = {
    provide: NewsScrapingFacade,
    useClass: NewsScrapingFacadeECT,
}
