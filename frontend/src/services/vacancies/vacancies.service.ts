import type { ICreateVacancy } from '@/types/ICreateVacancy'
import type { IUpdateVacancy } from '@/types/IUpdateVacancy'
import type { IVacancyEntity } from '@/entites/IVacancy'
import type { IVacancyRepository } from '@/repositories/vacancies/vacancies.repository'

export interface IVacancyService {
  getVacanciesByProjectId(projectId: number): Promise<IVacancyEntity[]>
  delete(VacancyId: number): Promise<IVacancyEntity>
  update(VacancyId: number, data: IUpdateVacancy): Promise<IVacancyEntity>
  create(data: ICreateVacancy): Promise<IVacancyEntity>
}

export class VacancyServiceImpl implements IVacancyService {
  constructor(private readonly vacancyRepository: IVacancyRepository) {}

  async getVacanciesByProjectId(projectId: number): Promise<IVacancyEntity[]> {
    const res = await this.vacancyRepository.getVacanciesByProjectId(projectId)

    return res
  }

  async delete(vacancyId: number): Promise<IVacancyEntity> {
    const res = await this.vacancyRepository.delete(vacancyId)

    return res
  }

  async update(vacancyId: number, data: IUpdateVacancy): Promise<IVacancyEntity> {
    const res = await this.vacancyRepository.update(vacancyId, data)

    return res
  }

  async create(data: ICreateVacancy): Promise<IVacancyEntity> {
    const res = await this.vacancyRepository.create(data)

    return res
  }
}
