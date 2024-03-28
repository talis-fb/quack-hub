import { authRepository } from '@/repositories'
import { AuthServiceImpl, type IAuthService } from './auth/auth.service'
import type { IStorageService } from './storage/storage.service'
import { LocalStorageServiceImpl } from './storage/storage.service'
import { JwtServiceImpl, type IJwtService } from './jwt/jwt.service'

const authService: IAuthService = new AuthServiceImpl(authRepository)

const storageService: IStorageService = new LocalStorageServiceImpl()

const jwtService: IJwtService = new JwtServiceImpl()

export { storageService, authService, jwtService }
