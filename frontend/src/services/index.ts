import {
  authRepository,
  experienceRepository,
  projectRepository,
  userRepository
} from '@/repositories'
import { AuthServiceImpl, type IAuthService } from '@/services/auth/auth.service'
import { LocalStorageServiceImpl, type IStorageService } from '@/services/storage/storage.service'
import { JwtServiceImpl, type IJwtService } from '@/services/jwt/jwt.service'
import { UserServiceImpl, type IUserService } from '@/services/user/user.service'
import { ExperienceServiceImpl, type IExperienceService } from './experience/experience.service'
import { ProjectServiceImpl, type IProjectService } from './project/project.service'

const authService: IAuthService = new AuthServiceImpl(authRepository)

const storageService: IStorageService = new LocalStorageServiceImpl()

const jwtService: IJwtService = new JwtServiceImpl()

const userService: IUserService = new UserServiceImpl(userRepository)

const experienceService: IExperienceService = new ExperienceServiceImpl(experienceRepository)

const projectService: IProjectService = new ProjectServiceImpl(projectRepository)

export { storageService, authService, jwtService, userService, experienceService, projectService }
