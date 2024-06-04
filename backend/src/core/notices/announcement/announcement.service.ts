import { Injectable, Provider } from '@nestjs/common';
import { AnnouncementEntity } from './announcement.entity';
import { AnnouncementScrapingFacade } from './announcement.scraping.facade';

export abstract class AnnouncementService {
  abstract getAnnouncement(
    typeFilter?: string,
    statusFilter?: string,
  ): Promise<AnnouncementEntity[]>;
}

@Injectable()
export class AnnouncementServiceImpl implements AnnouncementService {
  constructor(
    private readonly announcementScrapingFacade: AnnouncementScrapingFacade,
  ) {}

  async getAnnouncement(
    typeFilter?: string,
    statusFilter?: string,
  ): Promise<AnnouncementEntity[]> {
    const output = await this.announcementScrapingFacade.getAnnouncement(
      typeFilter,
      statusFilter,
    );
    return output;
  }
}

export const AnnouncementServiceProvider: Provider = {
  provide: AnnouncementService,
  useClass: AnnouncementServiceImpl,
};
