import { UserApiImpl, type IUserApi } from '@/apis/user/user.api'
import { ExperienceApiImpl, type IExperienceApi } from '@/apis/experience/experience.api'
import { ProjectApiImpl, type IProjectApi } from './project/project.api'
import { VacancyApiImpl, type IVacancyApi } from './vacancies/vacancies.api'
import { GithubApi } from './github/github.api'
import { AuthApiImpl, type IAuthApi } from './auth/auth.api'
import { PostApiImpl, type IPostApi } from './post/post.api'
import { NewsApiImpl, type INewsApi } from './news/news.api'
import { AnnouncementsApiImpl, type IAnnouncementsApi } from './announcements/announcements.api'

const userApi: IUserApi = new UserApiImpl()

const experienceApi: IExperienceApi = new ExperienceApiImpl()

const projectApi: IProjectApi = new ProjectApiImpl()

const vacancyApi: IVacancyApi = new VacancyApiImpl()

const githubApi = new GithubApi()

const authApi: IAuthApi = new AuthApiImpl()

const postApi: IPostApi = new PostApiImpl()

const newsApi: INewsApi = new NewsApiImpl()

const announcementsApi: IAnnouncementsApi = new AnnouncementsApiImpl()

export {
  userApi,
  experienceApi,
  projectApi,
  vacancyApi,
  githubApi,
  authApi,
  postApi,
  newsApi,
  announcementsApi
}
