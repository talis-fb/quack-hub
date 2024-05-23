import { api } from '@/network/api'

import type { IProjectResponse } from '@/apis/project/models/IProjectResponse'
import { ProjectEntity, type IInputProjectData, type IProjectEntity } from '@/entites/IProject'

export interface IProjectImported {
  // methodologies: string[]
  title: string
  summary: string
  startDate: string
}

export interface IProjectApi {
  search(title?: string, userId?: number, states?: string[]): Promise<IProjectEntity[]>
  getProjectById(id: number): Promise<IProjectEntity>
  delete(projectId: number): Promise<IProjectEntity>
  update(projectId: number, data: IInputProjectData): Promise<IProjectEntity>
  create(data: IInputProjectData): Promise<IProjectEntity>
  importProject(username: string, projectName: string): Promise<IProjectImported>
}

export class ProjectApiImpl implements IProjectApi {
  async search(title?: string, userId?: number, states?: string[]): Promise<IProjectEntity[]> {
    const res = await api.get<IProjectEntity[]>('/projects', {
      params: {
        title,
        userId,
        states
      }
    })

    return res.data.map((e) => ProjectEntity.parse(e))
  }

  async getProjectById(id: number): Promise<IProjectEntity> {
    const res = await api.get<IProjectEntity>(`/projects/${id}`)
    return ProjectEntity.parse(res.data)
  }

  async delete(projectId: number): Promise<IProjectEntity> {
    const res = await api.delete<IProjectEntity>(`/projects/${projectId}`)
    return ProjectEntity.parse(res.data)
  }

  async update(projectId: number, data: IInputProjectData): Promise<IProjectEntity> {
    const res = await api.put<IProjectEntity>(`/projects/${projectId}`, data)
    return ProjectEntity.parse(res.data)
  }

  async create(data: IInputProjectData): Promise<IProjectEntity> {
    const res = await api.post<IProjectEntity>('/projects', data)
    return ProjectEntity.parse(res.data)
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
