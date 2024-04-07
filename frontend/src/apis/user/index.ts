import { UserApiImpl, type IUserApi } from './user.api'

const userApi: IUserApi = new UserApiImpl()

export { userApi }
