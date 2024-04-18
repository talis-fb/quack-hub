import type { IUserResponse } from '../auth/models/IUserResponse'
import { api } from '@/network/api'
import type { IUserData } from '@/entites/IUser'

export interface IUserApi {
  getUserById(id: number): Promise<IUserResponse>
  getProfile(): Promise<IUserResponse>
  updateUser(id: number, user: IUserData): Promise<IUserResponse>
}

export class UserApiImpl implements IUserApi {
  async getUserById(id: number): Promise<IUserResponse> {
    const res = await api.get(`/users/${id}`)

    return res.data
  }

  async getProfile(): Promise<IUserResponse> {
    const res = await api.get('/users/auth')

    return res.data
  }

  async updateUser(id: number, user: IUserData): Promise<IUserResponse> {
    const res = await api.put<IUserResponse>(`/users/${id}`, user)

    return res.data
  }
}
