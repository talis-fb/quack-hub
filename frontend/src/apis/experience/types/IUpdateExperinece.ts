import { type ExperienceType } from '@/entites/IExperience'

export interface IUpdateExperinece {
  title: string
  about: string
  startDate: Date
  endDate: Date
  type: ExperienceType
  projectId: number | null
}
