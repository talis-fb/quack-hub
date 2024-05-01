import type { IAuth } from '@/entites/IAuth'
import type { ISigninParams } from '@/interfaces/ISigninParams'
import type { ISignupParams } from '@/interfaces/ISignupParams'
import type { IAuthRepository } from '@/repositories/auth/auth.repository'

export interface IAuthService {
  signin(signinParams: ISigninParams): Promise<IAuth>
  signup(signupParams: ISignupParams): Promise<void>
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

  async signup(signupParams: ISignupParams): Promise<void> {
    try {
      await this.authRepository.signup(signupParams)
    } catch (error) {
      throw error
    }
  }
}
