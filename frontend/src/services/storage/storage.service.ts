export interface IStorageService {
  setItem(key: string, value: string): void

  getItem(key: string): string | null

  removeItem(key: string): void
}

export class StorageServiceImpl implements IStorageService {
  setItem(key: string, value: string): void {
    localStorage.setItem(key, value)
  }

  getItem(key: string): string | null {
    return localStorage.getItem(key)
  }

  removeItem(key: string): void {
    localStorage.removeItem(key)
  }
}
