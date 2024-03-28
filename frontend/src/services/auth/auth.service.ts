import type { IAuth } from '@/entites/IAuth'
import type { IUser } from '@/entites/IUser'
import type { ISigninParams } from '@/interfaces/ISigninParams'
import type { ISignupParams } from '@/interfaces/ISignupParams'
import type { IAuthRepository } from '@/repositories/auth/auth.repository'

export interface IAuthService {
  signin(signinParams: ISigninParams): Promise<IAuth>
  signup(signupParams: ISignupParams): Promise<IUser>
}

export class AuthServiceImpl implements IAuthService {
  constructor(private readonly authRepository: IAuthRepository) {}

  async signin(signinParams: ISigninParams): Promise<IAuth> {
    try {
      const res = await this.authRepository.signin(signinParams)

      return res
    } catch (error) {
      throw error
    }
  }

  async signup(signupParams: ISignupParams): Promise<IUser> {
    try {
      const res = await this.authRepository.signup(signupParams)

      return res
    } catch (error) {
      throw error
    }
  }
}
