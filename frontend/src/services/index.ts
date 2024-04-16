import { authRepository, experienceRepository } from '@/repositories'
import { AuthServiceImpl, type IAuthService } from '@/services/auth/auth.service'
import { LocalStorageServiceImpl, type IStorageService } from '@/services/storage/storage.service'
import { JwtServiceImpl, type IJwtService } from '@/services/jwt/jwt.service'
import { UserServiceImpl, type IUserService } from '@/services/user/user.service'
import { userApi } from '@/apis'
import { ExperienceServiceImpl, type IExperienceService } from './experience/experience.service';


const authService: IAuthService = new AuthServiceImpl(authRepository)

const storageService: IStorageService = new LocalStorageServiceImpl()

const jwtService: IJwtService = new JwtServiceImpl()

const userService: IUserService = new UserServiceImpl(userApi)

const experienceService: IExperienceService = new ExperienceServiceImpl(experienceRepository);

export { storageService, authService, jwtService, userService, experienceService }
