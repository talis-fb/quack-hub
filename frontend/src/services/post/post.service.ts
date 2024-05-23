import type { IPostApi } from '@/apis/post/post.api'
import type {
  ICommentData,
  ICommentEntity,
  ICommentEntityWithUserAndPostId
} from '@/entites/IComment'
import type { IPostData, IPostEntity, IPostEntityWithUser } from '@/entites/IPost'

export interface IPostService {
  search(username?: string): Promise<IPostEntityWithUser[]>
  getPostById(id: number): Promise<IPostEntityWithUser>
  delete(postId: number): Promise<IPostEntity>
  update(postId: number, data: IPostData): Promise<IPostEntityWithUser>
  create(data: IPostData): Promise<IPostEntityWithUser>
  getCommentsByPostId(postId: number): Promise<ICommentEntityWithUserAndPostId[]>
  createComment(data: ICommentData): Promise<ICommentEntityWithUserAndPostId>
  deleteComment(commentId: number): Promise<ICommentEntity>
  updateComment(
    commentId: number,
    data: Partial<ICommentData>
  ): Promise<ICommentEntityWithUserAndPostId>
}

export class PostServiceImpl implements IPostService {
  constructor(private readonly postApi: IPostApi) {}

  async search(username?: string): Promise<IPostEntityWithUser[]> {
    return await this.postApi.search(username)
  }

  async getPostById(id: number): Promise<IPostEntityWithUser> {
    return await this.postApi.getPostById(id)
  }

  async delete(id: number): Promise<IPostEntity> {
    return await this.postApi.delete(id)
  }

  async update(id: number, data: IPostData): Promise<IPostEntityWithUser> {
    return await this.postApi.update(id, data)
  }

  async create(data: IPostData): Promise<IPostEntityWithUser> {
    return await this.postApi.create(data)
  }

  async getCommentsByPostId(postId: number): Promise<ICommentEntityWithUserAndPostId[]> {
    return await this.postApi.getCommentsByPostId(postId)
  }

  async createComment(data: ICommentData): Promise<ICommentEntityWithUserAndPostId> {
    return await this.postApi.createComment(data)
  }

  async deleteComment(commentId: number): Promise<ICommentEntity> {
    return await this.postApi.deleteComment(commentId)
  }

  async updateComment(
    commentId: number,
    data: Partial<ICommentData>
  ): Promise<ICommentEntityWithUserAndPostId> {
    return await this.postApi.updateComment(commentId, data)
  }
}
