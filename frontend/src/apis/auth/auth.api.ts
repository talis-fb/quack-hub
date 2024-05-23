import type { ISigninParams } from '@/types/ISigninParams'
import { type IAuth, Auth } from '@/entites/IAuth'
import type { ISignupParams } from '@/types/ISignupParams'
import { api } from '@/network/api'
import type { IUserEntity } from '@/entites/IUser'

export interface IAuthApi {
  signin(signinParams: ISigninParams): Promise<IAuth>
  signup(signupParams: ISignupParams): Promise<IUserEntity>
  meVerifyToken(): Promise<{ message: string }>
}

export class AuthApiImpl implements IAuthApi {
  async signin(signinParams: ISigninParams): Promise<IAuth> {
    const res = await api.post<IAuth>('/auth/login', signinParams)
    const data = res.data
    return Auth.parse(data)
  }
  async signup(signupParams: ISignupParams): Promise<IUserEntity> {
    const res = await api.post<IUserEntity>('/auth/signup', signupParams)

    const data = res.data

    return data
  }

  async meVerifyToken(): Promise<{ message: string }> {
    const res = await api.get<{ message: string }>('/auth/me')

    return res.data
  }
}
