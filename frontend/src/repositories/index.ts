import { postApi } from '@/apis'
import { experienceApi, projectApi, userApi, vacancyApi } from '@/apis'
import {
  ProjectRepositoryImpl,
  type IProjectRepository
} from '@/repositories/project/project.repository'
import {
  VacancyRepositoryImpl,
  type IVacancyRepository
} from '@/repositories/vacancies/vacancies.repository'

const projectRepository: IProjectRepository = new ProjectRepositoryImpl(projectApi)

const vacancyRepository: IVacancyRepository = new VacancyRepositoryImpl(vacancyApi)

export { projectRepository, vacancyRepository }
