import type { IPostApi } from '@/apis/post/post.api'
import type { ICommentEntity } from '@/entites/IComment'
import type { IPostData, IPostEntity, IPostEntityWithUser } from '@/entites/IPost'

export interface IPostRepository {
  search(username?: string): Promise<IPostEntityWithUser[]>
  getPostById(id: number): Promise<IPostEntityWithUser>
  delete(postId: number): Promise<IPostEntity>
  update(postId: number, data: IPostData): Promise<IPostEntity>
  create(data: IPostData): Promise<IPostEntity>
  getCommentsByPostId(posttId: number): Promise<ICommentEntity[]>
}

export class PostRepositoryImpl implements IPostRepository {
  constructor(private readonly postApi: IPostApi) {}

  async search(username?: string): Promise<IPostEntityWithUser[]> {
    const res = await this.postApi.search(username)

    return res
  }

  async getPostById(id: number): Promise<IPostEntityWithUser> {
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

  async getCommentsByPostId(posttId: number): Promise<ICommentEntity[]> {
    const res = await this.postApi.getCommentsByPostId(posttId)

    return res
  }
}
