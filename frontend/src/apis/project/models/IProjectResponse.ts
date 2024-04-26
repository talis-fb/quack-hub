import type { StateProject } from '@/entites/IProject'

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
  logoUrl: string | null
  userId: number
}
