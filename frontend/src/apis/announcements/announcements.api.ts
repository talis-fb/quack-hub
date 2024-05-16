import type { IAnnouncementEntity } from '@/entites/IAnnouncement'
import { api } from '@/network/api'

export interface IAnnouncementsApi {
  getAnnouncements(): Promise<IAnnouncementEntity[]>
}

export class AnnouncementsApiImpl implements IAnnouncementsApi {
  async getAnnouncements(): Promise<IAnnouncementEntity[]> {
    const res = await api.get('/announcement')

    return res.data
  }
}
