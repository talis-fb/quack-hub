import type { INewsEntity } from '@/entites/INews'
import { api } from '@/network/api'

export interface INewsApi {
  getNews(): Promise<INewsEntity[]>
}

export class NewsApiImpl implements INewsApi {
  async getNews(): Promise<INewsEntity[]> {
    const res = await api.get('/news')

    return res.data
  }
}
