import { api } from '@/network/api'
import type { ICreateVacancy } from '../../types/ICreateVacancy'
import type { IUpdateVacancy } from '../../types/IUpdateVacancy'
import { VacancyEntity, type IVacancyEntity } from '@/entites/IVacancy'

export interface IVacancyApi {
  getVacanciesByProjectId(projectId: number): Promise<IVacancyEntity[]>
  delete(VacancyId: number): Promise<IVacancyEntity>
  update(VacancyId: number, data: IUpdateVacancy): Promise<IVacancyEntity>
  create(data: ICreateVacancy): Promise<IVacancyEntity>
}

export class VacancyApiImpl implements IVacancyApi {
  async getVacanciesByProjectId(projectId: number): Promise<IVacancyEntity[]> {
    const vacancyList = await api.get<any[]>(`/vacancies/projects/${projectId}`)
    return vacancyList.data.map((vacancy) => VacancyEntity.parse(vacancy))
  }

  async delete(vacancyId: number): Promise<IVacancyEntity> {
    return (await api.delete<IVacancyEntity>(`/vacancies/${vacancyId}`)).data
  }

  async update(vacancyId: number, data: IUpdateVacancy): Promise<IVacancyEntity> {
    return (await api.put<IVacancyEntity>(`/vacancies/${vacancyId}`, data)).data
  }

  async create(data: ICreateVacancy): Promise<IVacancyEntity> {
    return (await api.post<IVacancyEntity>('/vacancies', data)).data
  }
}
