import * as cheerio from 'cheerio';

import { Injectable, Provider } from '@nestjs/common';
import { AnnouncementScrapingFacade } from '../announcement.scraping.facade';
import { AnnouncementEntity } from '../announcement.entity';
import { HttpService } from '@nestjs/axios';

@Injectable()
export class AnnouncementScrapingFacadeUSP implements AnnouncementScrapingFacade {
    private url: string;

    constructor(private readonly httpService: HttpService) {
        this.url = 'https://www5.usp.br/tag/edital/';
    }
    
    async getAnnouncement(typeFilter?: string, statusFilter?: string): Promise<AnnouncementEntity[]> {
        const output = await this.httpService.axiosRef.get(this.url, {
            responseType: 'document',
        });

        let announcements: AnnouncementEntity[] = [];
      
        const $ = await cheerio.load(output.data);
      
        const announcementNode = $('article.status-publish').children();

        announcementNode.each((index, value) => {
            try {
              const titleNode = $(value).find('h2.entry-title').children();
              const dateNode = $(value).find('time.published');
              const announcementInfoNode = $(value).find('div.entry-content');
    
              const title = titleNode.text();
              const url = titleNode.attr('href');
              const date = dateNode.text().trim();
              const announcementInfo = announcementInfoNode.find('p').text();
              
              const announcement = {
                announcementInfo,
                title,
                date,
                url,
              };

              announcements.push(announcement);
            } catch (error) {
              console.log(error);
            }
          });
    
        return announcements;
    }
    
}

export const AnnouncementScrapingFacadeProviderUSP: Provider = {
    provide: AnnouncementScrapingFacade,
    useClass: AnnouncementScrapingFacadeUSP,
}