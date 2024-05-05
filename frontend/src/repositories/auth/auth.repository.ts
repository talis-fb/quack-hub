import type { IAuthApi } from '@/apis/auth/auth.api'
import type { IAuth } from '@/entites/IAuth'

import type { ISigninParams } from '@/types/ISigninParams'
import type { ISignupParams } from '@/types/ISignupParams'

export interface IAuthRepository {
  signin(signinParams: ISigninParams): Promise<IAuth>
  signup(signupParams: ISignupParams): Promise<void>
}

export class AuthRepositoryImpl implements IAuthRepository {
  constructor(private readonly authApi: IAuthApi) {}

  async signin(signinParams: ISigninParams): Promise<IAuth> {
    const res = await this.authApi.signin(signinParams)

    const newRes: IAuth = {
      accessToken: res.access_token
    }

    return newRes
  }
  async signup(signupParams: ISignupParams): Promise<void> {
    await this.authApi.signup(signupParams)
  }
}
