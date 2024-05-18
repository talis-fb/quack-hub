import type { IInputUserData, IUserEntity } from '@/entites/IUser'
import type { IUserRepository } from '@/repositories/user/user.repository'

export interface IUserService {
  getUserById(id: number): Promise<IUserEntity>
  getProfile(): Promise<IUserEntity>
  updateUser(id: number, user: IInputUserData): Promise<IUserEntity>
  follow(userId: number): Promise<void>
  unFollow(userId: number): Promise<void>
  search(name?: string): Promise<IUserEntity[]>
}

export class UserServiceImpl implements IUserService {
  constructor(private readonly userRepository: IUserRepository) {}

  async getUserById(id: number): Promise<IUserEntity> {
    const res = await this.userRepository.getUserById(id)

    return res
  }

  async getProfile(): Promise<IUserEntity> {
    const res = await this.userRepository.getProfile()

    return res
  }

  async updateUser(id: number, user: IInputUserData): Promise<IUserEntity> {
    return await this.userRepository.updateUser(id, user)
  }

  async follow(userId: number): Promise<void> {
    await this.userRepository.follow(userId)
  }

  async unFollow(userId: number): Promise<void> {
    await this.userRepository.unFollow(userId)
  }

  async search(name?: string): Promise<IUserEntity[]> {
    const res = await this.userRepository.search(name)

    return res
  }
}
