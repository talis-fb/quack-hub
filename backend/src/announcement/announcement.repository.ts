import * as cheerio from 'cheerio';

import { Injectable, Provider } from '@nestjs/common';
import { AnnouncementEntity } from './announcement.entity';
import { HttpService } from '@nestjs/axios';

export abstract class AnnouncementRepository {
  abstract getAnnouncement(
    typeFilter?: string,
    statusFilter?: string,
  ): Promise<AnnouncementEntity[]>;
}

@Injectable()
export class AnnouncementRepositoryImpl implements AnnouncementRepository {
  private url: string;

  constructor(private readonly httpService: HttpService) {
    this.url = 'https://www.metropoledigital.ufrn.br/portal/editais';
  }

  async getAnnouncement(
    typeFilter?: string,
    statusFilter?: string,
  ): Promise<AnnouncementEntity[]> {
    const announcements: AnnouncementEntity[] = [];

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

        const announcement = {
          announcementInfo,
          title,
          date,
          type,
          url,
          status,
        };

        if (filter(announcement, typeFilter, statusFilter) == true) {
          announcements.push(announcement);
        }
      } catch (error) {
        console.log(error);
      }
    });

    return announcements;
  }
}

function filter(
  announcement: AnnouncementEntity,
  type?: string,
  status?: string,
) {
  if (isValid(type) && isValid(status)) {
    if (announcement.type === type && announcement.status === status) {
      return true;
    } else {
      return false;
    }
  } else if (isValid(type)) {
    if (announcement.type === type) {
      return true;
    } else {
      return false;
    }
  } else if (isValid(status)) {
    if (announcement.status === status) {
      return true;
    } else {
      return false;
    }
  } else {
    return true;
  }
}

function isValid(param: any) {
  if (param !== undefined && param !== '') {
    return true;
  } else {
    return false;
  }
}

export const AnnouncementRepositoryProvider: Provider = {
  provide: AnnouncementRepository,
  useClass: AnnouncementRepositoryImpl,
};
