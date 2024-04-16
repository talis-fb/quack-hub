import type { IUserResponse } from '../auth/models/IUserResponse'
import { api } from '@/network/api'
import type { IUserData } from '@/entites/IUser'

export interface IUserApi {
  getProfile(): Promise<IUserResponse>
  updateUser(id: number, user: IUserData): Promise<IUserResponse>
}

export class UserApiImpl implements IUserApi {
  async getProfile(): Promise<IUserResponse> {
    const res = await api.get('/users/auth')

    return res.data
  }

  async updateUser(id: number, user: IUserData): Promise<IUserResponse> {
    return (await api.put<IUserResponse>(`/users/${id}`, user)).data
  }
}
