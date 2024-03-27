import type { IStorageService } from './storage/storage.service'
import { StorageServiceImpl } from './storage/storage.service'

const storageService: IStorageService = new StorageServiceImpl()

export { storageService }
