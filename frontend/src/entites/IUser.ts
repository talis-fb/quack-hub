export interface IUser {
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

  createdAt: string
  updatedAt: string
}
