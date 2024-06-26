import { api } from '@/network/api'

import type { IProjectResponse } from '@/apis/project/models/IProjectResponse'
import type { IInputProjectData } from '@/entites/IProject'

export interface IProjectImported {
  // methodologies: string[]
  title: string
  summary: string
  startDate: string
}

export interface IProjectApi {
  search(title?: string, userId?: number, states?: string[]): Promise<IProjectResponse[]>
  getProjectById(id: number): Promise<IProjectResponse>
  delete(projectId: number): Promise<IProjectResponse>
  update(projectId: number, data: IInputProjectData): Promise<IProjectResponse>
  create(data: IInputProjectData): Promise<IProjectResponse>
  importProject(username: string, projectName: string): Promise<IProjectImported>
}

export class ProjectApiImpl implements IProjectApi {
  async search(title?: string, userId?: number, states?: string[]): Promise<IProjectResponse[]> {
    const res = await api.get<IProjectResponse[]>('/projects', {
      params: {
        title,
        userId,
        states
      }
    })

    return res.data
  }

  async getProjectById(id: number): Promise<IProjectResponse> {
    const res = await api.get<IProjectResponse>(`/projects/${id}`)

    return res.data
  }

  async delete(projectId: number): Promise<IProjectResponse> {
    const res = await api.delete<IProjectResponse>(`/projects/${projectId}`)

    return res.data
  }

  async update(projectId: number, data: IInputProjectData): Promise<IProjectResponse> {
    const res = await api.put<IProjectResponse>(`/projects/${projectId}`, data)

    return res.data
  }

  async create(data: IInputProjectData): Promise<IProjectResponse> {
    const res = await api.post<IProjectResponse>('/projects', data)

    return res.data
  }

  async importProject(username: string, projectName: string): Promise<IProjectImported> {
    const res = await api.get<IProjectImported>('/projects/import', {
      params: {
        username,
        projectName
      }
    })

    return res.data
  }
}
