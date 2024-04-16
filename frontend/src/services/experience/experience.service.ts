import type { IExperienceEntity } from '@/entites/IExperience'
import type { ICreateExperience } from '@/apis/experience/types/ICreateExperience'
import type { IExperienceRepository } from '@/repositories/experience/experience.repository';

export interface IExperienceService {
  create(data: ICreateExperience): Promise<IExperienceEntity>
}

export class ExperienceServiceImpl implements IExperienceService {
  constructor(private readonly experienceRepository: IExperienceRepository) {}

  async create(data: ICreateExperience): Promise<IExperienceEntity> {
    const res = await this.experienceRepository.create(data);
    
    return res;
  }
}
