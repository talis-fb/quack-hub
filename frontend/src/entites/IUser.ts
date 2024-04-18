export interface IUserData {
  email: string

  name: string
  birthday: string
  bio?: string
  aboutDescription?: string
  avatarUrl?: string
  phone?: string
  blog?: string

  followedBy: number
  following: number
}

export interface IUserEntity extends IUserData {
  id: number
  createdAt: string
  updatedAt: string
}
