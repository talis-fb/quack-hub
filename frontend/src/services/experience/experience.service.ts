import type { ExperienceType, IExperienceEntity } from '@/entites/IExperience'
import type { ICreateExperience } from '@/apis/experience/types/ICreateExperience'
import type { IExperienceRepository } from '@/repositories/experience/experience.repository'

export interface IExperienceService {
  getExperiencesByUserId(userId: number, type?: ExperienceType): Promise<IExperienceEntity[]>
  create(data: ICreateExperience): Promise<IExperienceEntity>
}

export class ExperienceServiceImpl implements IExperienceService {
  constructor(private readonly experienceRepository: IExperienceRepository) {}

  async getExperiencesByUserId(
    userId: number,
    type?: ExperienceType
  ): Promise<IExperienceEntity[]> {
    const res = await this.experienceRepository.getExperiencesByUserId(userId, type)

    return res
  }

  async create(data: ICreateExperience): Promise<IExperienceEntity> {
    const res = await this.experienceRepository.create(data)

    return res
  }
}
