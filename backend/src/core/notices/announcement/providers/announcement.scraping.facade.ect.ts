import * as cheerio from 'cheerio';

import { Injectable, Provider } from '@nestjs/common';
import { AnnouncementScrapingFacade } from '../announcement.scraping.facade';
import { HttpService } from '@nestjs/axios';
import { AnnouncementEntity } from '../announcement.entity';

@Injectable()
export class AnnouncementScrapingFacadeECT implements AnnouncementScrapingFacade {
  private url: string;

  constructor(private readonly httpService: HttpService) {
    this.url = 'https://www.ect.ufrn.br/documentos/?tipo=editais';
  }

  async getAnnouncement(
    typeFilter?: string,
    statusFilter?: string,
  ): Promise<AnnouncementEntity[]> {
    const output = await this.httpService.axiosRef.get(this.url, {
      responseType: 'document',
    });

    let announcements: AnnouncementEntity[] = [];

    const $ = await cheerio.load(output.data);

    const announcementNode = $('tr');

    announcementNode.each((index, value) => {
        try {
          const titleNode = $(value).find('a');
          const dateNode = $(value).find('td:last');
          const statusNode = $(value).parent().parent().parent();

          const title = titleNode.text();
          const url = titleNode.attr('href');
          const date = dateNode.text().trim();
          const status = statusNode.attr('id').slice(4);
          
          const announcement = {
            title,
            date,
            url,
            status,
          };

          if(announcement) {
            if(announcement.title !== "") {
                if(announcement.status == "emandamento") {
                    announcement.status = "Em andamento"
                } else {
                    announcement.status = "Encerrados"
                }
                announcements.push(announcement);
            }
          }
        } catch (error) {
          console.log(error);
        }
      });

      if(statusFilter) {
        announcements = announcements.filter(it => it.status == statusFilter)
      }

    return announcements;
  }
}

export const AnnouncementScrapingFacadeProviderECT: Provider = {
  provide: AnnouncementScrapingFacade,
  useClass: AnnouncementScrapingFacadeECT,
};
