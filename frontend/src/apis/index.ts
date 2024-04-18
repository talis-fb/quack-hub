import { UserApiImpl, type IUserApi } from "@/apis/user/user.api";
import { ExperienceApiImpl, type IExperienceApi } from "@/apis/experience/experience.api";


const userApi: IUserApi = new UserApiImpl()

const experienceApi: IExperienceApi = new ExperienceApiImpl();

export { userApi, experienceApi }
