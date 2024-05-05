import { api } from '@/network/api'
import type { ICreateVacancy } from '../../types/ICreateVacancy'
import type { IVacancyResponse } from '../project/models/IVacancyResponse'
import type { IUpdateVacancy } from '../../types/IUpdateVacancy'

export interface IVacancyApi {
  getVacanciesByProjectId(projectId: number): Promise<IVacancyResponse[]>
  delete(VacancyId: number): Promise<IVacancyResponse>
  update(VacancyId: number, data: IUpdateVacancy): Promise<IVacancyResponse>
  create(data: ICreateVacancy): Promise<IVacancyResponse>
}

export class VacancyApiImpl implements IVacancyApi {
  async getVacanciesByProjectId(projectId: number): Promise<IVacancyResponse[]> {
    const res = await api.get<IVacancyResponse[]>(`/vacancies/projects/${projectId}`)

    return res.data
  }

  async delete(vacancyId: number): Promise<IVacancyResponse> {
    const res = await api.delete<IVacancyResponse>(`/vacancies/${vacancyId}`)

    return res.data
  }

  async update(vacancyId: number, data: IUpdateVacancy): Promise<IVacancyResponse> {
    const res = await api.put<IVacancyResponse>(`/vacancies/${vacancyId}`, data)

    return res.data
  }

  async create(data: ICreateVacancy): Promise<IVacancyResponse> {
    const res = await api.post<IVacancyResponse>('/vacancies', data)

    return res.data
  }
}
