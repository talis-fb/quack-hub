import type { ISigninParams } from '@/interfaces/ISigninParams'
import type { IAuthResponse } from './models/IAuthResponse'
import type { IUserResponse } from './models/IUserResponse'
import type { ISignupParams } from '@/interfaces/ISignupParams'
import { api } from '@/network/api'

export interface IAuthApi {
  signin(signinParams: ISigninParams): Promise<IAuthResponse>
  signup(signupParams: ISignupParams): Promise<IUserResponse>
}

export class AuthApiImpl implements IAuthApi {
  async signin(signinParams: ISigninParams): Promise<IAuthResponse> {
    const res = await api.post<IAuthResponse>('/auth/signin', signinParams)

    const data = res.data

    return data
  }
  async signup(signupParams: ISignupParams): Promise<IUserResponse> {
    const res = await api.post<IUserResponse>('/auth/signup', signupParams)

    const data = res.data

    return data
  }
}
