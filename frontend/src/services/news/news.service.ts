import type { INewsApi } from '@/apis/news/news.api'
import type { INewsEntity } from '@/entites/INews'

export interface INewsService {
  getNews(): Promise<INewsEntity[]>
}

export class NewsServiceImpl implements INewsService {
  constructor(private readonly newsApi: INewsApi) {}

  async getNews(): Promise<INewsEntity[]> {
    const res = await this.newsApi.getNews()

    return res
  }
}
