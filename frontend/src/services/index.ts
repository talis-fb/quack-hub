import { authRepository } from '@/repositories'
import { AuthServiceImpl, type IAuthService } from './auth/auth.service'
import type { IStorageService } from './storage/storage.service'
import { LocalStorageServiceImpl } from './storage/storage.service'
import { JwtServiceImpl, type IJwtService } from './jwt/jwt.service'
import { UserServiceImpl, type IUserService } from './user/user.service'
import { userApi } from '@/apis/user'

const authService: IAuthService = new AuthServiceImpl(authRepository)

const storageService: IStorageService = new LocalStorageServiceImpl()

const jwtService: IJwtService = new JwtServiceImpl()

const userService: IUserService = new UserServiceImpl(userApi)

export { storageService, authService, jwtService, userService }
