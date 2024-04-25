import { api } from '@/network/api'

import type { ICreateProject } from '@/apis/project/types/ICreateProject'
import type { IUpdateProject } from '@/apis/project/types/IUpdateProject'
import type { IProjectResponse } from '@/apis/project/models/IProjectResponse'
import type { ICreateVacancy } from '@/apis/project/types/ICreateVacancy'
import { type IVacancyResponse } from '@/apis/project/models/IVacancyResponse'
import type { IUpdateVacancy } from '@/apis/project/types/IUpdateVacancy'

export interface IProjectApi {
  search(title?: string, userId?: number): Promise<IProjectResponse[]>
  getProjectById(id: number): Promise<IProjectResponse>
  delete(projectId: number): Promise<IProjectResponse>
  update(projectId: number, data: IUpdateProject): Promise<IProjectResponse>
  create(data: ICreateProject): Promise<IProjectResponse>

  createVacancy(data: ICreateVacancy): Promise<IVacancyResponse>
  deleteVacancy(vacancyId: number): Promise<IVacancyResponse>
  updateVacancy(vacancyId: number, data: IUpdateVacancy): Promise<IVacancyResponse>
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

  async createVacancy(data: ICreateVacancy): Promise<IVacancyResponse> {
    const res = await api.post<IVacancyResponse>('/vacancies', data)

    return res.data
  }

  async deleteVacancy(vacancyId: number): Promise<IVacancyResponse> {
    const res = await api.delete<IVacancyResponse>(`/vacancies/${vacancyId}`)

    return res.data
  }

  async updateVacancy(vacancyId: number, data: IUpdateVacancy): Promise<IVacancyResponse> {
    const res = await api.put<IVacancyResponse>(`/vacancies/${vacancyId}`, data)

    return res.data
  }
}
