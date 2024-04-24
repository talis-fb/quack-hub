import type { ICreateProject } from './types/ICreateProject'
import type { IUpdateProject } from './types/IUpdateProject'
import type { IProjectResponse } from './models/IProjectResponse'
import { api } from '@/network/api'

export interface IProjectApi {
  search(title?: string, userId?: number): Promise<IProjectResponse[]>
  delete(projectId: number): Promise<IProjectResponse>
  update(projectId: number, data: IUpdateProject): Promise<IProjectResponse>
  create(data: ICreateProject): Promise<IProjectResponse>
}

export class ProjectApiImpl implements IProjectApi {
  async search(title?: string, userId?: number): Promise<IProjectResponse[]> {
    const res = await api.get<IProjectResponse[]>('/projects', {
      params: {
        title,
        userId
      }
    })

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
