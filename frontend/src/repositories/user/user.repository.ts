import type { IUserData, IUserEntity } from '@/entites/IUser'
import type { IUserApi } from '@/apis/user/user.api'

export interface IUserRepository {
  getUserById(id: number): Promise<IUserEntity>
  getProfile(): Promise<IUserEntity>
  updateUser(id: number, user: IUserData): Promise<IUserEntity>
}

// TODO: Criar uma função que serializa o IUserResponse para IUserEntity
export class UserRepositoryImpl implements IUserRepository {
  constructor(private readonly userApi: IUserApi) {}

  async getUserById(id: number): Promise<IUserEntity> {
    const res = await this.userApi.getUserById(id)

    const newRes: IUserEntity = {
      id: res.id,
      createdAt: res.createdAt,
      updatedAt: res.updatedAt,

      email: res.email,
      name: res.name,
      birthday: res.birthday,
      bio: res.bio,
      aboutDescription: res.aboutDescription,
      avatarUrl: res.avatarUrl,
      phone: res.phone,
      blog: res.blog,

      followedBy: res._count.followedBy,
      following: res._count.following
    }

    return newRes
  }

  async getProfile(): Promise<IUserEntity> {
    const res = await this.userApi.getProfile()

    const newRes: IUserEntity = {
      id: res.id,
      createdAt: res.createdAt,
      updatedAt: res.updatedAt,

      email: res.email,
      name: res.name,
      birthday: res.birthday,
      bio: res.bio,
      aboutDescription: res.aboutDescription,
      avatarUrl: res.avatarUrl,
      phone: res.phone,
      blog: res.blog,

      followedBy: res._count.followedBy,
      following: res._count.following
    }

    return newRes
  }

  async updateUser(id: number, user: IUserData): Promise<IUserEntity> {
    const res = await this.userApi.updateUser(id, user)

    const newRes: IUserEntity = {
      id: res.id,
      createdAt: res.createdAt,
      updatedAt: res.updatedAt,

      email: res.email,
      name: res.name,
      birthday: res.birthday,
      bio: res.bio,
      aboutDescription: res.aboutDescription,
      avatarUrl: res.avatarUrl,
      phone: res.phone,
      blog: res.blog,

      followedBy: res._count.followedBy,
      following: res._count.following
    }

    return newRes
  }
}
