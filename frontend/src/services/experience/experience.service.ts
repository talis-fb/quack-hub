import type { ExperienceType, IExperienceData, IExperienceEntity } from '@/entites/IExperience'
import type { IExperienceRepository } from '@/repositories/experience/experience.repository'

export interface IExperienceService {
  delete(experienceId: number): Promise<IExperienceEntity>
  update(experienceId: number, data: IExperienceData): Promise<IExperienceEntity>
  getExperiencesByUserId(userId: number, type?: ExperienceType): Promise<IExperienceEntity[]>
  create(data: IExperienceData): Promise<IExperienceEntity>
}

export class ExperienceServiceImpl implements IExperienceService {
  constructor(private readonly experienceRepository: IExperienceRepository) {}

  async delete(experienceId: number): Promise<IExperienceEntity> {
    const res = await this.experienceRepository.delete(experienceId)

    return res
  }

  async update(experienceId: number, data: IExperienceData): Promise<IExperienceEntity> {
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

  async create(data: IExperienceData): Promise<IExperienceEntity> {
    const res = await this.experienceRepository.create(data)

    return res
  }
}
