import { authApi, postApi } from '@/apis'
import {
  ExperienceRepositoryImpl,
  type IExperienceRepository
} from '@/repositories/experience/experience.repository'
import { experienceApi, projectApi, userApi, vacancyApi } from '@/apis'
import { UserRepositoryImpl, type IUserRepository } from './user/user.repository'
import {
  ProjectRepositoryImpl,
  type IProjectRepository
} from '@/repositories/project/project.repository'
import {
  VacancyRepositoryImpl,
  type IVacancyRepository
} from '@/repositories/vacancies/vacancies.repository'
import { PostRepositoryImpl, type IPostRepository } from './post/post.repository'

const experienceRepository: IExperienceRepository = new ExperienceRepositoryImpl(experienceApi)

const userRepository: IUserRepository = new UserRepositoryImpl(userApi)

const projectRepository: IProjectRepository = new ProjectRepositoryImpl(projectApi)

const vacancyRepository: IVacancyRepository = new VacancyRepositoryImpl(vacancyApi)

const postRepository: IPostRepository = new PostRepositoryImpl(postApi)

export {
  experienceRepository,
  userRepository,
  projectRepository,
  vacancyRepository,
  postRepository
}
