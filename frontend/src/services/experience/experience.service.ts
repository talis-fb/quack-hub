import type { ExperienceType, IExperienceEntity } from '@/entites/IExperience'
import type { ICreateExperience } from '@/apis/experience/types/ICreateExperience'
import type { IExperienceRepository } from '@/repositories/experience/experience.repository'
import type { IUpdateExperinece } from '@/apis/experience/types/IUpdateExperinece'

export interface IExperienceService {
  delete(experienceId: number): Promise<IExperienceEntity>
  update(experienceId: number, data: IUpdateExperinece): Promise<IExperienceEntity>
  getExperiencesByUserId(userId: number, type?: ExperienceType): Promise<IExperienceEntity[]>
  create(data: ICreateExperience): Promise<IExperienceEntity>
}

export class ExperienceServiceImpl implements IExperienceService {
  constructor(private readonly experienceRepository: IExperienceRepository) {}

  async delete(experienceId: number): Promise<IExperienceEntity> {
    const res = await this.experienceRepository.delete(experienceId)

    return res
  }

  async update(experienceId: number, data: IUpdateExperinece): Promise<IExperienceEntity> {
    const res = await this.experienceRepository.update(experienceId, data)

    return res
  }

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
