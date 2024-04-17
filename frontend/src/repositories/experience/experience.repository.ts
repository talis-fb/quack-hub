import type { ExperienceType, IExperienceEntity } from '@/entites/IExperience'
import type { ICreateExperience } from '@/apis/experience/types/ICreateExperience'
import type { IUpdateExperinece } from '@/apis/experience/types/IUpdateExperinece'
import type { IExperienceApi } from '@/apis/experience/experience.api'

export interface IExperienceRepository {
  update(experienceId: number, data: IUpdateExperinece): Promise<IExperienceEntity>
  getExperiencesByUserId(userId: number, type?: ExperienceType): Promise<IExperienceEntity[]>
  create(data: ICreateExperience): Promise<IExperienceEntity>
}

export class ExperienceRepositoryImpl implements IExperienceRepository {
  constructor(private readonly experienceApi: IExperienceApi) {}

  async update(experienceId: number, data: IUpdateExperinece): Promise<IExperienceEntity> {
    const res = await this.experienceApi.update(experienceId, data)

    return res
  }

  async getExperiencesByUserId(userId: number, type?: any): Promise<IExperienceEntity[]> {
    const res = await this.experienceApi.getExperiencesByUserId(userId, type)

    return res
  }

  async create(data: ICreateExperience): Promise<IExperienceEntity> {
    const res = await this.experienceApi.create(data)

    return res
  }
}
