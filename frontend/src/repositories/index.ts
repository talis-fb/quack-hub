import { authApi } from '@/apis/auth'
import { AuthRepositoryImpl, type IAuthRepository } from '@/repositories/auth/auth.repository'
import {
  ExperienceRepositoryImpl,
  type IExperienceRepository
} from '@/repositories/experience/experience.repository'
import { experienceApi, projectApi, userApi } from '@/apis'
import { UserRepositoryImpl, type IUserRepository } from './user/user.repository'
import { ProjectRepositoryImpl, type IProjectRepository } from './project/project.repository'

const authRepository: IAuthRepository = new AuthRepositoryImpl(authApi)

const experienceRepository: IExperienceRepository = new ExperienceRepositoryImpl(experienceApi)

const userRepository: IUserRepository = new UserRepositoryImpl(userApi)

const projectRepository: IProjectRepository = new ProjectRepositoryImpl(projectApi)

export { authRepository, experienceRepository, userRepository, projectRepository }
