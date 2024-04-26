import type { StateVacancy } from '@/entites/IVacancy'

export interface IVacancyResponse {
  id: number
  title: string
  description: string
  requirements: string[]
  state: StateVacancy
  projectId: number
  createdAt: string
  updatedAt: string
}
