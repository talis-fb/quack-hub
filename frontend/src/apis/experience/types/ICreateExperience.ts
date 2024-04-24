import type { ExperienceType, IExperienceData } from '@/entites/IExperience'

export interface ICreateExperience {
  title: string
  about: string
  type: ExperienceType
  startDate: Date
  endDate: Date
  projectId: number | null
  achievements: {
    title: string
    description: string
  }[]
}


