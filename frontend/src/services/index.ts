import { authRepository } from '@/repositories'
import { AuthServiceImpl, type IAuthService } from './auth/auth.service'
import type { IStorageService } from './storage/storage.service'
import { StorageServiceImpl } from './storage/storage.service'

const authService: IAuthService = new AuthServiceImpl(authRepository)

const storageService: IStorageService = new StorageServiceImpl()

export { storageService, authService }
