import type { IUserApi } from '@/apis/user/user.api'
import type { IInputUserData, IUserEntity } from '@/entites/IUser'

export interface IUserService {
  getUserById(id: number): Promise<IUserEntity>
  getProfile(): Promise<IUserEntity>
  updateUser(id: number, user: IInputUserData): Promise<IUserEntity>
  follow(userId: number): Promise<void>
  unFollow(userId: number): Promise<void>
  search(name?: string): Promise<IUserEntity[]>
}

export class UserServiceImpl implements IUserService {
  constructor(private readonly userApi: IUserApi) {}

  async getUserById(id: number): Promise<IUserEntity> {
    return await this.userApi.getUserById(id)
  }

  async getProfile(): Promise<IUserEntity> {
    return await this.userApi.getProfile()
  }

  async updateUser(id: number, user: IInputUserData): Promise<IUserEntity> {
    return await this.userApi.updateUser(id, user)
  }

  async follow(userId: number): Promise<void> {
    await this.userApi.follow(userId)
  }

  async unFollow(userId: number): Promise<void> {
    await this.userApi.unFollow(userId)
  }

  async search(name?: string): Promise<IUserEntity[]> {
    return await this.userApi.search(name)
  }
}
