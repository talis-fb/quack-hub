export const StateVacancyValues = ['PAUSED', 'CLOSED', 'PROGRESS'] as const

export type StateVacancy = (typeof StateVacancyValues)[number]

export interface IVacancyData {
  title: string
  description: string
  requirements: string[]
  state: StateVacancy
  projectId: number
}

export interface IVacancyEntity extends IVacancyData {
  id: number
  createdAt: Date
  updatedAt: Date
}
