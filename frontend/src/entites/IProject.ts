import { type IVacancyEntity } from './IVacancy'
export const StateProjectValues = ['IDLE', 'PROGRESS', 'COMPLETED', 'CANCELLED'] as const

export type StateProject = (typeof StateProjectValues)[number]

export interface IProjectData {
  title: string
  summary: string
  about: string
  sector: string
  state: StateProject
  methodologies: string[]
  startDate: Date
  endDate: Date
  vacancies: IVacancyEntity[]

  userId: number
}

export interface IProjectEntity extends IProjectData {
  id: number
  createdAt: string
  updatedAt: string
}
