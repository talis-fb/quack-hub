import { api } from '@/network/api'
import type { IUserData, IUserEntity } from '@/entites/IUser'

export interface IUserApi {
  getUserById(id: number): Promise<IUserEntity>
  getProfile(): Promise<IUserEntity>
  updateUser(id: number, user: IUserData): Promise<IUserEntity>
  follow(userId: number): Promise<void>
  unFollow(userId: number): Promise<void>
}

export class UserApiImpl implements IUserApi {
  async getUserById(id: number): Promise<IUserEntity> {
    const res = await api.get(`/users/${id}`)

    return res.data
  }

  async getProfile(): Promise<IUserEntity> {
    const res = await api.get('/users/auth')

    return res.data
  }

  async updateUser(id: number, user: IUserData): Promise<IUserEntity> {
    const res = await api.put<IUserEntity>(`/users/${id}`, user)

    return res.data
  }

  async follow(userId: number): Promise<void> {
    await api.post(`/users/follow/${userId}`)
  }

  async unFollow(userId: number): Promise<void> {
    await api.post(`/users/unfollow/${userId}`)
  }
}
