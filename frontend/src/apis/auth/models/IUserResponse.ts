export interface IUserResponse {
  id: number
  email: string
  password: string

  name: string
  birthday: string
  bio?: string
  aboutDescription?: string
  avatarUrl?: string
  phone?: string
  blog?: string

  _count: {
    followedBy: number
    following: number
  }

  createdAt: string
  updatedAt: string
}
