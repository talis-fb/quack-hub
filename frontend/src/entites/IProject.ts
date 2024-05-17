import type { IInputMethodologieEntity, IOutputMethodologieEntity } from './IMethodologie'

export const StateProjectValues = ['PAUSED', 'PROGRESS', 'COMPLETED', 'CANCELLED'] as const

export type StateProject = (typeof StateProjectValues)[number]

export interface IProjectData {
  title: string
  summary: string
  about: string
  sector: string
  state: StateProject
  startDate: Date
  endDate: Date | null
  logoUrl: string | null
}

export interface IInputProjectData extends IProjectData {
  methodologies: IInputMethodologieEntity[]
}

export interface IOutputProjectData extends IProjectData {
  methodologies: IOutputMethodologieEntity[]
}

export interface IProjectEntity extends IOutputProjectData {
  id: number
  userId: number

  createdAt: string
  updatedAt: string
}
