import * as cheerio from 'cheerio';

import { Injectable, Provider } from '@nestjs/common';
import { AnnouncementEntity } from './announcement.entity';
import { HttpService } from '@nestjs/axios';

export abstract class AnnouncementRepository {
  abstract getAnnouncement(): Promise<AnnouncementEntity[]>;
}

@Injectable()
export class AnnouncementRepositoryImpl implements AnnouncementRepository {
  private url: string;

  constructor(private readonly httpService: HttpService) {
    this.url = 'https://www.metropoledigital.ufrn.br/portal/editais';
  }

  async getAnnouncement(): Promise<AnnouncementEntity[]> {
    const announcement: AnnouncementEntity[] = [];

    const output = await this.httpService.axiosRef.get(this.url, {
      responseType: 'document',
    });

    const $ = await cheerio.load(output.data);

    const announcementNode = $('div.box-card-content').parent();

    announcementNode.each((index, value) => {
      try {
        const url =
          'https://www.metropoledigital.ufrn.br' +
          announcementNode.attr('href');
        const announcementInfoNode = $(value).find('span:first');
        const titleNode = $(value).find('h5');
        const dateNode = $(value).find('p');
        const typeNode = $(value).children().find('div');
        const statusNode = $(value).parent().parent().parent().find('p:first');

        const announcementInfo = announcementInfoNode.text();
        const title = titleNode.text();
        const date = dateNode.children().text();
        const type = typeNode.children().text();
        const status = statusNode.text();

        announcement.push({ announcementInfo, title, date, type, url, status });
      } catch (error) {
        console.log(error);
      }
    });

    return announcement;
  }
}

export const AnnouncementRepositoryProvider: Provider = {
  provide: AnnouncementRepository,
  useClass: AnnouncementRepositoryImpl,
};
