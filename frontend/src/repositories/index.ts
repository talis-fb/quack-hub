import { authApi } from '@/apis/auth'
import { AuthRepositoryImpl, type IAuthRepository } from '@/repositories/auth/auth.repository'
import {
  ExperienceRepositoryImpl,
  type IExperienceRepository
} from '@/repositories/experience/experience.repository'
import { experienceApi, userApi } from '@/apis'
import { UserRepositoryImpl, type IUserRepository } from './user/user.repository'

const authRepository: IAuthRepository = new AuthRepositoryImpl(authApi)

const experienceRepository: IExperienceRepository = new ExperienceRepositoryImpl(experienceApi)

const userRepository: IUserRepository = new UserRepositoryImpl(userApi)

export { authRepository, experienceRepository, userRepository }
