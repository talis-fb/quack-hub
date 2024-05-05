import type { IPostData, IPostEntity } from '@/entites/IPost'
import { api } from '@/network/api'

export interface IPostApi {
  search(username?: string): Promise<IPostEntity[]>
  getPostById(id: number): Promise<IPostEntity>
  delete(id: number): Promise<IPostEntity>
  update(id: number, data: IPostData): Promise<IPostEntity>
  create(data: IPostData): Promise<IPostEntity>
}

export class PostApiImpl implements IPostApi {
  async search(username?: string): Promise<IPostEntity[]> {
    const res = await api.get<IPostEntity[]>('/posts', {
      params: {
        username
      }
    })

    return res.data
  }

  async getPostById(id: number): Promise<IPostEntity> {
    const res = await api.get<IPostEntity>(`/posts/${id}`)

    return res.data
  }

  async delete(id: number): Promise<IPostEntity> {
    const res = await api.delete<IPostEntity>(`/posts/${id}`)

    return res.data
  }

  async update(id: number, data: IPostData): Promise<IPostEntity> {
    const res = await api.put<IPostEntity>(`/posts/${id}`, data)

    return res.data
  }

  async create(data: IPostData): Promise<IPostEntity> {
    const res = await api.post<IPostEntity>('/posts', data)

    return res.data
  }
}
