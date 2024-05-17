import type { IAnnouncementsApi } from '@/apis/announcements/announcements.api'
import type { IAnnouncementEntity } from '@/entites/IAnnouncement'

export interface IAnnouncementsService {
  getAnnouncements(type?: string, status?: string): Promise<IAnnouncementEntity[]>
}

export class AnnouncementsServiceImpl implements IAnnouncementsService {
  constructor(private readonly announcementsApi: IAnnouncementsApi) {}

  async getAnnouncements(type?: string, status?: string): Promise<IAnnouncementEntity[]> {
    const res = await this.announcementsApi.getAnnouncements(type, status)

    return res
  }
}
