import type { IPostApi } from '@/apis/post/post.api'
import type { IPostData, IPostEntity } from '@/entites/IPost'

export interface IPostService {
  search(username?: string): Promise<IPostEntity[]>
  getPostById(id: number): Promise<IPostEntity>
  delete(postId: number): Promise<IPostEntity>
  update(postId: number, data: IPostData): Promise<IPostEntity>
  create(data: IPostData): Promise<IPostEntity>
}

export class PostServiceImpl implements IPostService {
  constructor(private readonly postApi: IPostApi) {}

  async search(username?: string): Promise<IPostEntity[]> {
    const res = await this.postApi.search(username)

    return res
  }

  async getPostById(id: number): Promise<IPostEntity> {
    const res = await this.postApi.getPostById(id)

    return res
  }

  async delete(id: number): Promise<IPostEntity> {
    const res = await this.postApi.delete(id)

    return res
  }

  async update(id: number, data: IPostData): Promise<IPostEntity> {
    const res = await this.postApi.update(id, data)

    return res
  }

  async create(data: IPostData): Promise<IPostEntity> {
    const res = await this.postApi.create(data)

    return res
  }
}
