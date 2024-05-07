import type { StateProject } from '@/entites/IProject'

export interface IUpdateProject {
  title: string
  summary: string
  about: string
  sector: string
  state: StateProject
  methodologies?: string[]
  startDate: Date
  endDate: Date
}
