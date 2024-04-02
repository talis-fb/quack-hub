export interface IUserData {
  email: string
  name: string
  birthday?: Date
  bio?: string
  aboutDescription?: string
  avatarUrl?: string
  phone?: string
  blog?: string
}

export interface IUserEntity extends IUserData {
  id: number
  createdAt: string
  updatedAt: string
}
