import type { ExperienceType, IExperienceData } from '@/entites/IExperience'

export interface ICreateExperience {
  title: string
  about: string
  startDate: Date
  endDate: Date
  type: ExperienceType
  userId: number
  projectId: number | null
  achievements: {
    title: string
    description: string
  }[]
}
