import type { IAuth } from '@/entites/IAuth'
import type { ISigninParams } from '@/types/ISigninParams'
import type { ISignupParams } from '@/types/ISignupParams'
import type { IAuthApi } from '@/apis/auth/auth.api'

export interface IAuthService {
  signin(signinParams: ISigninParams): Promise<IAuth>
  signup(signupParams: ISignupParams): Promise<void>
}

export class AuthServiceImpl implements IAuthService {
  constructor(private readonly authApi: IAuthApi) {}

  async signin(signinParams: ISigninParams): Promise<IAuth> {
    return await this.authApi.signin(signinParams)
  }

  async signup(signupParams: ISignupParams): Promise<void> {
    await this.authApi.signup(signupParams)
  }
}
