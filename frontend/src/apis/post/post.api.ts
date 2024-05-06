import type {
  ICommentData,
  ICommentEntity,
  ICommentEntityWithUserAndPostId
} from '@/entites/IComment'
import type { IPostData, IPostEntity, IPostEntityWithUser } from '@/entites/IPost'
import { api } from '@/network/api'

export interface IPostApi {
  search(username?: string): Promise<IPostEntityWithUser[]>
  getPostById(id: number): Promise<IPostEntityWithUser>
  delete(id: number): Promise<IPostEntity>
  update(id: number, data: IPostData): Promise<IPostEntity>
  create(data: IPostData): Promise<IPostEntity>

  getCommentsByPostId(postId: number): Promise<ICommentEntityWithUserAndPostId[]>
  createComment(data: ICommentData): Promise<ICommentEntityWithUserAndPostId>
  deleteComment(commentId: number): Promise<ICommentEntity>
  updateComment(
    commentId: number,
    data: Partial<ICommentData>
  ): Promise<ICommentEntityWithUserAndPostId>
}

export class PostApiImpl implements IPostApi {
  async search(username?: string): Promise<IPostEntityWithUser[]> {
    const res = await api.get<IPostEntityWithUser[]>('/posts', {
      params: {
        username
      }
    })

    return res.data
  }

  async getPostById(id: number): Promise<IPostEntityWithUser> {
    const res = await api.get<IPostEntityWithUser>(`/posts/${id}`)

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

  async getCommentsByPostId(postId: number): Promise<ICommentEntityWithUserAndPostId[]> {
    const res = await api.get<ICommentEntityWithUserAndPostId[]>(`/comments/post/${postId}`)

    return res.data
  }

  async createComment(data: ICommentData): Promise<ICommentEntityWithUserAndPostId> {
    const res = await api.post<ICommentEntityWithUserAndPostId>('/comments', data)

    return res.data
  }

  async deleteComment(commentId: number): Promise<ICommentEntity> {
    const res = await api.delete<ICommentEntity>(`/comments/${commentId}`)

    return res.data
  }

  async updateComment(
    commentId: number,
    data: Partial<ICommentData>
  ): Promise<ICommentEntityWithUserAndPostId> {
    const res = await api.put<ICommentEntityWithUserAndPostId>(`/comments/${commentId}`, data)

    return res.data
  }
}
