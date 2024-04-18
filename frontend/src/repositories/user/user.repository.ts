import type { IUserResponse } from '@/apis//auth/models/IUserResponse'
import type { IUserData } from '@/entites/IUser'
import type { IUserApi } from '@/apis/user/user.api'

export interface IUserRepository {
  getUserById(id: number): Promise<IUserResponse>
  getProfile(): Promise<IUserResponse>
  updateUser(id: number, user: IUserData): Promise<IUserResponse>
}

export class UserRepositoryImpl implements IUserRepository {
  constructor(private readonly userApi: IUserApi) {}

  async getUserById(id: number): Promise<IUserResponse> {
    const res = await this.userApi.getUserById(id)

    return res
  }

  async getProfile(): Promise<IUserResponse> {
    const res = await this.getProfile()

    return res
  }

  async updateUser(id: number, user: IUserData): Promise<IUserResponse> {
    const res = await this.userApi.updateUser(id, user)

    return res
  }
}
