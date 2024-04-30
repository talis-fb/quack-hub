import { authApi } from '@/apis/auth'
import { AuthRepositoryImpl, type IAuthRepository } from '@/repositories/auth/auth.repository'
import {
  ExperienceRepositoryImpl,
  type IExperienceRepository
} from '@/repositories/experience/experience.repository'
import { experienceApi, githubApi, projectApi, userApi, vacancyApi } from '@/apis'
import { UserRepositoryImpl, type IUserRepository } from './user/user.repository'
import {
  ProjectRepositoryImpl,
  type IProjectRepository
} from '@/repositories/project/project.repository'
import {
  VacancyRepositoryImpl,
  type IVacancyRepository
} from '@/repositories/vacancies/vacancies.repository'
import { GithubRepository } from './github/github.repository'

const authRepository: IAuthRepository = new AuthRepositoryImpl(authApi)

const experienceRepository: IExperienceRepository = new ExperienceRepositoryImpl(experienceApi)

const userRepository: IUserRepository = new UserRepositoryImpl(userApi)

const projectRepository: IProjectRepository = new ProjectRepositoryImpl(projectApi)

const vacancyRepository: IVacancyRepository = new VacancyRepositoryImpl(vacancyApi)

const githubRepository = new GithubRepository(githubApi)

export {
  authRepository,
  experienceRepository,
  userRepository,
  projectRepository,
  vacancyRepository,
  githubRepository
}
