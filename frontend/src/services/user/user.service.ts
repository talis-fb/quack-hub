import type { IUserResponse } from '@/apis/auth/models/IUserResponse'
import type { IUserApi } from '@/apis/user/user.api'
import type { IUserData } from '@/entites/IUser'

export interface IUserService {
    getProfile(): Promise<IUserResponse>
    updateUser(id: number, user: IUserData): Promise<IUserResponse>
    
}

export class UserServiceImpl implements IUserService {
    constructor(private readonly userApi: IUserApi) {}

    async getProfile(): Promise<IUserResponse> {
        const res = await this.userApi.getProfile();

        return res;
    }

    async updateUser(id: number, user: IUserData): Promise<IUserResponse> {
        return await this.userApi.updateUser(id, user)
    }
}