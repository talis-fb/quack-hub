import { authApi } from '@/apis/auth'
import { AuthRepositoryImpl, type IAuthRepository } from '@/repositories/auth/auth.repository';
import { ExperienceRepositoryImpl, type IExperienceRepository } from '@/repositories/experience/experience.repository';
import { experienceApi } from '@/apis';

const authRepository: IAuthRepository = new AuthRepositoryImpl(authApi)

const experienceRepository: IExperienceRepository = new ExperienceRepositoryImpl(experienceApi);

export { authRepository, experienceRepository }
