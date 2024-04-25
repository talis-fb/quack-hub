import type { ICreateProject } from '@/apis/project/types/ICreateProject'
import type { ICreateVacancy } from '@/apis/project/types/ICreateVacancy'
import type { IUpdateProject } from '@/apis/project/types/IUpdateProject'
import type { IUpdateVacancy } from '@/apis/project/types/IUpdateVacancy'
import type { IProjectEntity } from '@/entites/IProject'
import type { IVacancyEntity } from '@/entites/IVacancy'
import type { IProjectRepository } from '@/repositories/project/project.repository'

export interface IProjectService {
  search(title?: string, userId?: number): Promise<IProjectEntity[]>
  getProjectById(id: number): Promise<IProjectEntity>
  delete(projectId: number): Promise<IProjectEntity>
  update(projectId: number, data: IUpdateProject): Promise<IProjectEntity>
  create(data: ICreateProject): Promise<IProjectEntity>

  createVacancy(data: ICreateVacancy): Promise<IVacancyEntity>
  deleteVacancy(vacancyId: number): Promise<IVacancyEntity>
  updateVacancy(vacancyId: number, data: IUpdateVacancy): Promise<IVacancyEntity>
}

export class ProjectServiceImpl implements IProjectService {
  constructor(private readonly projectRepository: IProjectRepository) {}

  async search(title?: string, userId?: number): Promise<IProjectEntity[]> {
    const res = await this.projectRepository.search(title, userId)

    return res
  }

  async getProjectById(id: number): Promise<IProjectEntity> {
    const res = await this.projectRepository.getProjectById(id)

    return res
  }

  async delete(projectId: number): Promise<IProjectEntity> {
    const res = await this.projectRepository.delete(projectId)

    return res
  }

  async update(projectId: number, data: IUpdateProject): Promise<IProjectEntity> {
    const res = await this.projectRepository.update(projectId, data)

    return res
  }

  async create(data: ICreateProject): Promise<IProjectEntity> {
    const res = await this.projectRepository.create(data)

    return res
  }

  async createVacancy(data: ICreateVacancy): Promise<IVacancyEntity> {
    const res = await this.projectRepository.createVacancy(data)

    return res
  }

  async updateVacancy(vacancyId: number, data: IUpdateVacancy): Promise<IVacancyEntity> {
    const res = await this.projectRepository.updateVacancy(vacancyId, data)

    return res
  }

  async deleteVacancy(vacancyId: number): Promise<IVacancyEntity> {
    const res = await this.projectRepository.deleteVacancy(vacancyId)

    return res
  }
}
