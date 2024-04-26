export interface IUserData {
  email: string
  name: string
  birthday: string | null
  bio: string | null
  aboutDescription: string | null
  avatarUrl: string | null
  phone: string | null
  blog: string | null

  followedBy: number
  following: number
}

export interface IUserEntity extends IUserData {
  id: number
  createdAt: string
  updatedAt: string
}
