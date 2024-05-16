import type { IAnnouncementsApi } from '@/apis/announcements/announcements.api'
import type { IAnnouncementEntity } from '@/entites/IAnnouncement'

export interface IAnnouncementsService {
  getAnnouncements(): Promise<IAnnouncementEntity[]>
}

export class AnnouncementsServiceImpl implements IAnnouncementsService {
  constructor(private readonly announcementsApi: IAnnouncementsApi) {}

  async getAnnouncements(): Promise<IAnnouncementEntity[]> {
    const res = await this.announcementsApi.getAnnouncements()

    return res
  }
}
