export const StateProjectValues = ['PAUSED', 'PROGRESS', 'COMPLETED', 'CANCELLED'] as const

export type StateProject = (typeof StateProjectValues)[number]

export interface IProjectData {
  title: string
  summary: string
  about: string
  sector: string
  state: StateProject
  methodologies: string[]
  startDate: Date
  endDate: Date | null
  logoUrl: string | null
}

export interface IProjectEntity extends IProjectData {
  id: number
  userId: number

  createdAt: string
  updatedAt: string
}
