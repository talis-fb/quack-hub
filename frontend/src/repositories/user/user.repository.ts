import type { IInputUserData, IUserEntity } from '@/entites/IUser'
import type { IUserApi } from '@/apis/user/user.api'

export interface IUserRepository {
  getUserById(id: number): Promise<IUserEntity>
  getProfile(): Promise<IUserEntity>
  updateUser(id: number, user: IInputUserData): Promise<IUserEntity>
  follow(userId: number): Promise<void>
  unFollow(userId: number): Promise<void>
  search(name?: string): Promise<IUserEntity[]>
}

export class UserRepositoryImpl implements IUserRepository {
  constructor(private readonly userApi: IUserApi) {}

  async getUserById(id: number): Promise<IUserEntity> {
    const res = await this.userApi.getUserById(id)

    return res
  }

  async getProfile(): Promise<IUserEntity> {
    const res = await this.userApi.getProfile()

    return res
  }

  async updateUser(id: number, user: IInputUserData): Promise<IUserEntity> {
    const res = await this.userApi.updateUser(id, user)

    return res
  }

  async follow(userId: number): Promise<void> {
    await this.userApi.follow(userId)
  }

  async unFollow(userId: number): Promise<void> {
    await this.userApi.unFollow(userId)
  }

  async search(name?: string): Promise<IUserEntity[]> {
    const res = await this.userApi.search(name)

    return res
  }
}
