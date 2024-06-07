import { AnnouncementEntity } from './announcement.entity';

export abstract class AnnouncementScrapingFacade {
  abstract getAnnouncement(
    typeFilter?: string,
    statusFilter?: string,
  ): Promise<AnnouncementEntity[]>;
}
