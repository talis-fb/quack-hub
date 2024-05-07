import type { IUserEntity } from './IUser'

export interface IPostData {
  title: string
  content: string
  imageUrl: string | null
}

export interface IPostDataWithCount extends IPostData {
  _count: {
    comments: number
    likes: number
  }
}

export interface IPostEntity extends IPostDataWithCount {
  id: number
  createdAt: string
  updatedAt: string
}

export interface IPostEntityWithUser extends IPostEntity {
  User: IUserEntity
}
