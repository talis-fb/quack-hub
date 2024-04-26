export const StateVacancyValues = ['OPEN', 'CLOSED', 'IN_SELECTION_PROCESS'] as const

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
