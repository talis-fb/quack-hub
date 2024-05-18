import type { IInputMethodologieEntity, IOutputMethodologieEntity } from '@/entites/IMethodologie'

export interface IUserData {
  email: string
  name: string
  birthday: string
  bio?: string | null
  aboutDescription?: string | null
  avatarUrl?: string | null
  phone?: string | null
  blog?: string | null
}

export interface IInputUserData extends IUserData {
  methodologies: IInputMethodologieEntity[]
}

export interface IOutputUserData extends IUserData {
  methodologies: IOutputMethodologieEntity[]
}

export interface IUserEntity extends IOutputUserData {
  id: number

  followedBy: IUserEntity[]
  following: IUserEntity[]

  createdAt: string
  updatedAt: string
}
