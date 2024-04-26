import type { StateProject } from '@/entites/IProject'
import type { IVacancyEntity } from '@/entites/IVacancy'

export interface IProjectResponse {
  id: number
  createdAt: string
  updatedAt: string
  title: string
  summary: string
  about: string
  sector: string
  state: StateProject
  methodologies: string[]
  startDate: string
  endDate: string
  vacancies: IVacancyEntity[]

  userId: number;
}
