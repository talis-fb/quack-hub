import type { ICreateVacancy } from '@/types/ICreateVacancy'
import type { IUpdateVacancy } from '@/types/IUpdateVacancy'
import type { IVacancyEntity } from '@/entites/IVacancy'
import type { IVacancyRepository } from '@/repositories/vacancies/vacancies.repository'
import type { IVacancyApi } from '@/apis/vacancies/vacancies.api'

export interface IVacancyService {
  getVacanciesByProjectId(projectId: number): Promise<IVacancyEntity[]>
  delete(VacancyId: number): Promise<IVacancyEntity>
  update(VacancyId: number, data: IUpdateVacancy): Promise<IVacancyEntity>
  create(data: ICreateVacancy): Promise<IVacancyEntity>
}

export class VacancyServiceImpl implements IVacancyService {
  constructor(private readonly vacancyApi: IVacancyApi) {}

  async getVacanciesByProjectId(projectId: number): Promise<IVacancyEntity[]> {
    const res = await this.vacancyApi.getVacanciesByProjectId(projectId)

    return res
  }

  async delete(vacancyId: number): Promise<IVacancyEntity> {
    const res = await this.vacancyApi.delete(vacancyId)

    return res
  }

  async update(vacancyId: number, data: IUpdateVacancy): Promise<IVacancyEntity> {
    const res = await this.vacancyApi.update(vacancyId, data)

    return res
  }

  async create(data: ICreateVacancy): Promise<IVacancyEntity> {
    const res = await this.vacancyApi.create(data)

    return res
  }
}
