import { UserApiImpl, type IUserApi } from '@/apis/user/user.api'
import { ExperienceApiImpl, type IExperienceApi } from '@/apis/experience/experience.api'
import { ProjectApiImpl, type IProjectApi } from './project/project.api'
import { VacancyApiImpl, type IVacancyApi } from './vacancies/vacancies.api'
import { GithubApi } from './github/github.api'

const userApi: IUserApi = new UserApiImpl()

const experienceApi: IExperienceApi = new ExperienceApiImpl()

const projectApi: IProjectApi = new ProjectApiImpl()

const vacancyApi: IVacancyApi = new VacancyApiImpl()

const githubApi = new GithubApi()

export { userApi, experienceApi, projectApi, vacancyApi, githubApi }
