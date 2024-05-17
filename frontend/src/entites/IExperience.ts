import type { IAchievementEntity } from './IAchievement'

export const ExperienceTypeValues = ['PROFESSIONAL', 'ACADEMIC'] as const

export type ExperienceType = (typeof ExperienceTypeValues)[number]

export const StateExperienceValues = ['PAUSED', 'PROGRESS', 'COMPLETED', 'CANCELLED'] as const

export type StateExperience = (typeof StateExperienceValues)[number]

export interface IExperienceData {
  title: string
  about: string
  state: StateExperience
  startDate: string
  endDate: string | null
  type: ExperienceType
  achievements: IAchievementEntity[]
  projectId: number | null
}

export interface IExperienceEntity extends IExperienceData {
  id: number
  userId: number
  // createdAt: string
  // updatedAt: string
}
