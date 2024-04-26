export interface IUserResponse {
  id: number
  createdAt: string
  updatedAt: string

  email: string
  name: string
  birthday: string | null
  bio: string | null
  aboutDescription: string | null
  avatarUrl: string | null
  phone: string | null
  blog: string | null

  _count: {
    followedBy: number
    following: number
  }
}
