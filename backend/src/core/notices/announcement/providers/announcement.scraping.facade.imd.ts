import * as cheerio from 'cheerio';

import { Injectable, Provider } from '@nestjs/common';
import { AnnouncementScrapingFacade } from '../announcement.scraping.facade';
import { HttpService } from '@nestjs/axios';
import { AnnouncementEntity } from '../announcement.entity';

@Injectable()
export class AnnouncementScrapingFacadeIMD implements AnnouncementScrapingFacade {
  private url: string;

  constructor(private readonly httpService: HttpService) {
    this.url = 'https://www.metropoledigital.ufrn.br/portal/editais';
  }

  async getAnnouncement(
    typeFilter?: string,
    statusFilter?: string,
  ): Promise<AnnouncementEntity[]> {
    const output = await this.httpService.axiosRef.get(this.url, {
      responseType: 'document',
    });

    const $ = await cheerio.load(output.data);

    const announcementNode = $('div.box-card-content').parent();

    let announcements = announcementNode
      .toArray()
      .map((value) => {
        try {
          const url =
            'https://www.metropoledigital.ufrn.br' +
            $(value).attr('href');
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

          const announcement = {
            announcementInfo,
            title,
            date,
            type,
            url,
            status,
          };
          return announcement;
        } catch (error) {
          console.log(error);
        }
      })
      .filter(it => !!it);

      if(typeFilter) {
        announcements = announcements.filter(it => it.type == typeFilter)
      }

      if(statusFilter) {
        announcements = announcements.filter(it => it.status == statusFilter)
      }

    return announcements;
  }
}

export const AnnouncementScrapingFacadeProviderIMD: Provider = {
  provide: AnnouncementScrapingFacade,
  useClass: AnnouncementScrapingFacadeIMD,
};
