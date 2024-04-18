import type { IUserResponse } from '@/apis/auth/models/IUserResponse'
import type { IUserApi } from '@/apis/user/user.api'
import type { IUserData } from '@/entites/IUser'
import type { IUserRepository } from '@/repositories/user/user.repository'

export interface IUserService {
  getUserById(id: number): Promise<IUserResponse>
  getProfile(): Promise<IUserResponse>
  updateUser(id: number, user: IUserData): Promise<IUserResponse>
}

export class UserServiceImpl implements IUserService {
  constructor(private readonly userRepository: IUserRepository) {}
  async getUserById(id: number): Promise<IUserResponse> {
    const res = await this.userRepository.getUserById(id)

    return res
  }

  async getProfile(): Promise<IUserResponse> {
    const res = await this.userRepository.getProfile()

    return res
  }

  async updateUser(id: number, user: IUserData): Promise<IUserResponse> {
    return await this.userRepository.updateUser(id, user)
  }
}
