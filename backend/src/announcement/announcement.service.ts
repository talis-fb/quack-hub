import { Injectable, Provider } from '@nestjs/common';
import { AnnouncementEntity } from './announcement.entity';
import { AnnouncementRepository } from './announcement.repository';

export abstract class AnnouncementService {
  abstract getAnnouncement(): Promise<AnnouncementEntity[]>;
}

@Injectable()
export class AnnouncementServiceImpl implements AnnouncementService {
  constructor(
    private readonly announcementRepository: AnnouncementRepository,
  ) {}

  async getAnnouncement(): Promise<AnnouncementEntity[]> {
    const output = await this.announcementRepository.getAnnouncement();
    return output;
  }
}

export const AnnouncementServiceProvider: Provider = {
  provide: AnnouncementService,
  useClass: AnnouncementServiceImpl,
};
