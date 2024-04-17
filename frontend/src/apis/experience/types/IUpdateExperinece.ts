import type { IExperienceData } from '@/entites/IExperience'

export interface IUpdateExperinece extends Partial<Omit<IExperienceData, 'userId'>> {}
