import type { ISigninParams } from '@/interfaces/ISigninParams'
import type { IAuthResponse } from '../auth/models/IAuthResponse'
import type { IUserResponse } from '../auth/models/IUserResponse'
import type { ISignupParams } from '@/interfaces/ISignupParams'
import { api } from '@/network/api'
import type { IUserData, IUserEntity } from '@/entites/IUser'

export interface IUserApi {
  updateUser(id: number, user: IUserData): Promise<IUserResponse>
}

export class UserApiImpl implements IUserApi {
  async updateUser(id: number, user: IUserData): Promise<IUserResponse> {
    return (
      await api.post<IUserResponse>(`/auth/users/${id}`, user)
    ).data
  }
}
