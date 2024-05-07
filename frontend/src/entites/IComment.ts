import type { IUserEntity } from './IUser'

export interface ICommentData {
  content: string
  postId: number
}

export interface ICommentEntityWithUserAndPostId extends ICommentData {
  id: number
  createdAt: string
  updatedAt: string

  userId: number
  User: IUserEntity
}

export interface ICommentEntity extends ICommentData {
  id: number
  userId: number
  createdAt: string
  updatedAt: string
}
