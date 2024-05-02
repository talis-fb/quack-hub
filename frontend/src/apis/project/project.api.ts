import { api } from '@/network/api'

import type { ICreateProject } from '@/apis/project/types/ICreateProject'
import type { IUpdateProject } from '@/apis/project/types/IUpdateProject'
import type { IProjectResponse } from '@/apis/project/models/IProjectResponse'

export interface IProjectApi {
  search(title?: string, userId?: number, states?: string[]): Promise<IProjectResponse[]>
  getProjectById(id: number): Promise<IProjectResponse>
  delete(projectId: number): Promise<IProjectResponse>
  update(projectId: number, data: IUpdateProject): Promise<IProjectResponse>
  create(data: ICreateProject): Promise<IProjectResponse>
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

  async update(projectId: number, data: IUpdateProject): Promise<IProjectResponse> {
    const res = await api.put<IProjectResponse>(`/projects/${projectId}`, data)

    return res.data
  }

  async create(data: ICreateProject): Promise<IProjectResponse> {
    const res = await api.post<IProjectResponse>('/projects', data)

    return res.data
  }
}
