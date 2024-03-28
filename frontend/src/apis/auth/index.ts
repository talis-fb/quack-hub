import { AuthApiImpl, type IAuthApi } from './auth.api'

const authApi: IAuthApi = new AuthApiImpl()

export { authApi }
