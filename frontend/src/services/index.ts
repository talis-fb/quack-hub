import {
  experienceRepository,
  postRepository,
  projectRepository,
  userRepository,
  vacancyRepository
} from '@/repositories'
import { AuthServiceImpl, type IAuthService } from '@/services/auth/auth.service'
import { LocalStorageServiceImpl, type IStorageService } from '@/services/storage/storage.service'
import { JwtServiceImpl, type IJwtService } from '@/services/jwt/jwt.service'
import { UserServiceImpl, type IUserService } from '@/services/user/user.service'
import { ExperienceServiceImpl, type IExperienceService } from './experience/experience.service'
import { ProjectServiceImpl, type IProjectService } from './project/project.service'
import { VacancyServiceImpl, type IVacancyService } from './vacancies/vacancies.service'
import { PostServiceImpl, type IPostService } from './post/post.service'
import { NewsServiceImpl, type INewsService } from './news/news.service'
import { announcementsApi, authApi, methodologiesApi, newsApi } from '@/apis'
import {
  AnnouncementsServiceImpl,
  type IAnnouncementsService
} from './announcements/announcements.service'
import {
  MethodologiesServiceImpl,
  type IMethodologiesService
} from './methodologies/ methodologies.service'

const authService: IAuthService = new AuthServiceImpl(authApi)

const storageService: IStorageService = new LocalStorageServiceImpl()

const jwtService: IJwtService = new JwtServiceImpl()

const userService: IUserService = new UserServiceImpl(userRepository)

const experienceService: IExperienceService = new ExperienceServiceImpl(experienceRepository)

const projectService: IProjectService = new ProjectServiceImpl(projectRepository)

const vacancyService: IVacancyService = new VacancyServiceImpl(vacancyRepository)

const postService: IPostService = new PostServiceImpl(postRepository)

const newsService: INewsService = new NewsServiceImpl(newsApi)

const announcementService: IAnnouncementsService = new AnnouncementsServiceImpl(announcementsApi)

const methodologiesService: IMethodologiesService = new MethodologiesServiceImpl(methodologiesApi)

export {
  storageService,
  authService,
  jwtService,
  userService,
  experienceService,
  projectService,
  vacancyService,
  postService,
  newsService,
  announcementService,
  methodologiesService
}
