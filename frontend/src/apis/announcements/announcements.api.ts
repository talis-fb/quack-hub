import type { IAnnouncementEntity } from '@/entites/IAnnouncement'
import { api } from '@/network/api'

export interface IAnnouncementsApi {
  getAnnouncements(type?: string, status?: string): Promise<IAnnouncementEntity[]>
}

export class AnnouncementsApiImpl implements IAnnouncementsApi {
  async getAnnouncements(type?: string, status?: string): Promise<IAnnouncementEntity[]> {
    const res = await api.get('/announcement', { params: { type, status } })

    return res.data
  }
}
