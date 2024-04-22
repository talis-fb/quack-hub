import { UserApiImpl, type IUserApi } from '@/apis/user/user.api'
import { ExperienceApiImpl, type IExperienceApi } from '@/apis/experience/experience.api'
import { ProjectApiImpl, type IProjectApi } from './project/project.api'

const userApi: IUserApi = new UserApiImpl()

const experienceApi: IExperienceApi = new ExperienceApiImpl()

const projectApi: IProjectApi = new ProjectApiImpl()

export { userApi, experienceApi, projectApi }
