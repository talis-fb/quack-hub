import * as cheerio from 'cheerio';

import { Injectable, Provider } from '@nestjs/common';
import { NoticeEntity } from './notice.entity';
import { HttpService } from '@nestjs/axios';

export abstract class NoticeRepository {
  abstract getNotices(): Promise<NoticeEntity[]>;
}

@Injectable()
export class NoticeRepositoryImpl implements NoticeRepository {
  private url: string;

  constructor(private readonly httpService: HttpService) {
    this.url = 'https://www.metropoledigital.ufrn.br/portal/editais';
  }

  async getNotices(): Promise<NoticeEntity[]> {
    const notice: NoticeEntity[] = [];

    const output = await this.httpService.axiosRef.get(this.url, {
      responseType: 'document',
    });

    const $ = await cheerio.load(output.data);

    const noticeNode = $('div.box-card-content').parent();

    noticeNode.each((index, value) => {
      try {
        const url =
          'https://www.metropoledigital.ufrn.br' + noticeNode.attr('href');
        const noticeInfoNode = $(value).find('span');
        const titleNode = $(value).find('h5');
        const dateNode = $(value).find('p');
        const typeNode = $(value).children().find('div');

        const noticeInfo = noticeInfoNode.text();
        const title = titleNode.text();
        const date = dateNode.children().text();
        const type = typeNode.children().text();

        notice.push({ noticeInfo, title, date, type, url });
      } catch (error) {
        console.log(error);
      }
    });

    return notice;
  }
}

export const NoticeRepositoryProvider: Provider = {
  provide: NoticeRepository,
  useClass: NoticeRepositoryImpl,
};
