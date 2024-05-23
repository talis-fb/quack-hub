import type { IExperienceApi } from '@/apis/experience/experience.api'
import type { ExperienceType, IExperienceData, IExperienceEntity } from '@/entites/IExperience'

export interface IExperienceService {
  delete(experienceId: number): Promise<IExperienceEntity>
  update(experienceId: number, data: IExperienceData): Promise<IExperienceEntity>
  getExperiencesByUserId(userId: number, type?: ExperienceType): Promise<IExperienceEntity[]>
  create(data: IExperienceData): Promise<IExperienceEntity>
}

export class ExperienceServiceImpl implements IExperienceService {
  constructor(private readonly experienceApi: IExperienceApi) {}

  async delete(experienceId: number): Promise<IExperienceEntity> {
    return await this.experienceApi.delete(experienceId)
  }

  async update(experienceId: number, data: IExperienceData): Promise<IExperienceEntity> {
    return await this.experienceApi.update(experienceId, data)
  }

  async getExperiencesByUserId(
    userId: number,
    type?: ExperienceType
  ): Promise<IExperienceEntity[]> {
    return await this.experienceApi.getExperiencesByUserId(userId, type)
  }

  async create(data: IExperienceData): Promise<IExperienceEntity> {
    return await this.experienceApi.create(data)
  }
}
