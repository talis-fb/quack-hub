import type { IAuthApi } from '@/apis/auth/auth.api'
import type { IAuth } from '@/entites/IAuth'
import type { IUser } from '@/entites/IUser'
import type { ISigninParams } from '@/interfaces/ISigninParams'
import type { ISignupParams } from '@/interfaces/ISignupParams'

export interface IAuthRepository {
  signin(signinParams: ISigninParams): Promise<IAuth>
  signup(signupParams: ISignupParams): Promise<IUser>
}

export class AuthRepositoryImpl implements IAuthRepository {
  constructor(private readonly authApi: IAuthApi) {}

  async signin(signinParams: ISigninParams): Promise<IAuth> {
    const res = await this.authApi.signin(signinParams)

    const newRes: IAuth = {
      accessToken: res.accessToken
    }

    return newRes
  }
  async signup(signupParams: ISignupParams): Promise<IUser> {
    const res = await this.authApi.signup(signupParams)

    const newRes: IUser = {
      id: res.id,
      email: res.email,
      password: res.password,
      name: res.name,
      birthday: res.birthday,
      bio: res.bio,
      aboutDescription: res.aboutDescription,
      avatarUrl: res.avatarUrl,
      phone: res.phone,
      blog: res.blog,
      createdAt: res.createdAt,
      updatedAt: res.updatedAt
    }

    return newRes
  }
}
