import { authApi } from '@/apis/auth'
import { AuthRepositoryImpl, type IAuthRepository } from './auth/auth.repository'

const authRepository: IAuthRepository = new AuthRepositoryImpl(authApi)

export { authRepository }
