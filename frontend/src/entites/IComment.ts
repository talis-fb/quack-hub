import type { IUserEntity } from './IUser'

export interface ICommentData {
  content: string
  postId: number
}

export interface ICommentDataWithUserAndPostId extends ICommentData {
  userId: number
  User: IUserEntity
}

export interface ICommentEntity extends ICommentDataWithUserAndPostId {
  id: number
  createdAt: string
  updatedAt: string
}
