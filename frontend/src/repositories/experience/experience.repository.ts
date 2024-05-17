import type { ExperienceType, IExperienceData, IExperienceEntity } from '@/entites/IExperience'
import type { IExperienceApi } from '@/apis/experience/experience.api'

export interface IExperienceRepository {
  delete(experienceId: number): Promise<IExperienceEntity>
  update(experienceId: number, data: IExperienceData): Promise<IExperienceEntity>
  getExperiencesByUserId(userId: number, type?: ExperienceType): Promise<IExperienceEntity[]>
  create(data: IExperienceData): Promise<IExperienceEntity>
}

export class ExperienceRepositoryImpl implements IExperienceRepository {
  constructor(private readonly experienceApi: IExperienceApi) {}

  async delete(experienceId: number): Promise<IExperienceEntity> {
    const res = await this.experienceApi.delete(experienceId)

    return res
  }

  async update(experienceId: number, data: IExperienceData): Promise<IExperienceEntity> {
    const res = await this.experienceApi.update(experienceId, data)

    return res
  }

  async getExperiencesByUserId(userId: number, type?: any): Promise<IExperienceEntity[]> {
    const res = await this.experienceApi.getExperiencesByUserId(userId, type)

    return res
  }

  async create(data: IExperienceData): Promise<IExperienceEntity> {
    const res = await this.experienceApi.create(data)

    return res
  }
}
