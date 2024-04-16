import type { IExperienceEntity } from '@/entites/IExperience'
import type { ICreateExperience } from '@/apis/experience/types/ICreateExperience'
import type { IExperienceApi } from '@/apis/experience/experience.api'

export interface IExperienceRepository {
  create(data: ICreateExperience): Promise<IExperienceEntity>
}

export class ExperienceRepositoryImpl implements IExperienceRepository {
  constructor(private readonly experienceApi: IExperienceApi) {}

  async create(data: ICreateExperience): Promise<IExperienceEntity> {
    const res = await this.experienceApi.create(data);

    return res;
  }
}
