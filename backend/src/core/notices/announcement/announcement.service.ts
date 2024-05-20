import { Injectable, Provider } from '@nestjs/common';
import { AnnouncementEntity } from './announcement.entity';
import { AnnouncementRepository } from './announcement.repository';

export abstract class AnnouncementService {
  abstract getAnnouncement(
    typeFilter?: string,
    statusFilter?: string,
  ): Promise<AnnouncementEntity[]>;
}

@Injectable()
export class AnnouncementServiceImpl implements AnnouncementService {
  constructor(
    private readonly announcementRepository: AnnouncementRepository,
  ) {}

  async getAnnouncement(
    typeFilter?: string,
    statusFilter?: string,
  ): Promise<AnnouncementEntity[]> {
    const output = await this.announcementRepository.getAnnouncement(
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
