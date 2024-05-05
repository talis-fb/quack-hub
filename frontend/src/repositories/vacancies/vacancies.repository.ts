import type { ICreateVacancy } from '@/types/ICreateVacancy'
import type { IUpdateVacancy } from '@/types/IUpdateVacancy'
import type { IVacancyApi } from '@/apis/vacancies/vacancies.api'
import type { IVacancyEntity } from '@/entites/IVacancy'

export interface IVacancyRepository {
  getVacanciesByProjectId(projectId: number): Promise<IVacancyEntity[]>
  delete(VacancyId: number): Promise<IVacancyEntity>
  update(VacancyId: number, data: IUpdateVacancy): Promise<IVacancyEntity>
  create(data: ICreateVacancy): Promise<IVacancyEntity>
}

export class VacancyRepositoryImpl implements IVacancyRepository {
  constructor(private readonly vacancyApi: IVacancyApi) {}

  async getVacanciesByProjectId(projectId: number): Promise<IVacancyEntity[]> {
    const res = await this.vacancyApi.getVacanciesByProjectId(projectId)

    const newRes: IVacancyEntity[] = res.map((vacancy) => ({
      id: vacancy.id,
      createdAt: new Date(vacancy.createdAt),
      updatedAt: new Date(vacancy.updatedAt),
      title: vacancy.title,
      description: vacancy.description,
      requirements: vacancy.requirements,
      state: vacancy.state,
      projectId: vacancy.projectId
    }))

    return newRes
  }

  async delete(vacancyId: number): Promise<IVacancyEntity> {
    const res = await this.vacancyApi.delete(vacancyId)

    const newRes: IVacancyEntity = {
      id: res.id,
      createdAt: new Date(res.createdAt),
      updatedAt: new Date(res.updatedAt),
      title: res.title,
      description: res.description,
      requirements: res.requirements,
      state: res.state,
      projectId: res.projectId
    }

    return newRes
  }

  async update(vacancyId: number, data: IUpdateVacancy): Promise<IVacancyEntity> {
    const res = await this.vacancyApi.update(vacancyId, data)

    const newRes: IVacancyEntity = {
      id: res.id,
      createdAt: new Date(res.createdAt),
      updatedAt: new Date(res.updatedAt),
      title: res.title,
      description: res.description,
      requirements: res.requirements,
      state: res.state,
      projectId: res.projectId
    }

    return newRes
  }

  async create(data: ICreateVacancy): Promise<IVacancyEntity> {
    const res = await this.vacancyApi.create(data)

    const newRes: IVacancyEntity = {
      id: res.id,
      createdAt: new Date(res.createdAt),
      updatedAt: new Date(res.updatedAt),
      title: res.title,
      description: res.description,
      requirements: res.requirements,
      state: res.state,
      projectId: res.projectId
    }

    return newRes
  }
}
