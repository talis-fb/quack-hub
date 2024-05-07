import type { ISigninParams } from '@/types/ISigninParams'
import type { IAuthResponse } from './models/IAuthResponse'
import type { ISignupParams } from '@/types/ISignupParams'
import { api } from '@/network/api'
import type { IUserEntity } from '@/entites/IUser'

export interface IAuthApi {
  signin(signinParams: ISigninParams): Promise<IAuthResponse>
  signup(signupParams: ISignupParams): Promise<IUserEntity>
  meVerifyToken(): Promise<{ message: string }>
}

export class AuthApiImpl implements IAuthApi {
  async signin(signinParams: ISigninParams): Promise<IAuthResponse> {
    const res = await api.post<IAuthResponse>('/auth/login', signinParams)

    const data = res.data

    return data
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
