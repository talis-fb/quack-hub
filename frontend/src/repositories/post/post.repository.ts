import type { IPostApi } from '@/apis/post/post.api'
import type {
  ICommentData,
  ICommentEntity,
  ICommentEntityWithUserAndPostId
} from '@/entites/IComment'
import type { IPostData, IPostEntity, IPostEntityWithUser } from '@/entites/IPost'

export interface IPostRepository {
  search(username?: string): Promise<IPostEntityWithUser[]>
  getPostById(id: number): Promise<IPostEntityWithUser>
  delete(postId: number): Promise<IPostEntity>
  update(postId: number, data: IPostData): Promise<IPostEntityWithUser>
  create(data: IPostData): Promise<IPostEntityWithUser>
  getCommentsByPostId(postId: number): Promise<ICommentEntityWithUserAndPostId[]>
  createComment(data: ICommentData): Promise<ICommentEntityWithUserAndPostId>
  deleteComment(commentId: number): Promise<ICommentEntity>
  updateComment(commentId: number, data: Partial<ICommentData>): Promise<ICommentEntityWithUserAndPostId>

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

  async update(id: number, data: IPostData): Promise<IPostEntityWithUser> {
    const res = await this.postApi.update(id, data)

    return res
  }

  async create(data: IPostData): Promise<IPostEntityWithUser> {
    const res = await this.postApi.create(data)

    return res
  }

  async getCommentsByPostId(postId: number): Promise<ICommentEntityWithUserAndPostId[]> {
    const res = await this.postApi.getCommentsByPostId(postId)

    return res
  }

  async createComment(data: ICommentData): Promise<ICommentEntityWithUserAndPostId> {
    const res = await this.postApi.createComment(data)

    return res
  }

  async deleteComment(commentId: number): Promise<ICommentEntity> {
    const res = await this.postApi.deleteComment(commentId)

    return res
  }

  async updateComment(commentId: number, data: Partial<ICommentData>): Promise<ICommentEntityWithUserAndPostId> {
    const res = await this.postApi.updateComment(commentId, data)

    return res
  }
}
