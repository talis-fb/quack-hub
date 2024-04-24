import type { IProjectApi } from '@/apis/project/project.api'
import type { ICreateProject } from '@/apis/project/types/ICreateProject'
import type { IUpdateProject } from '@/apis/project/types/IUpdateProject'
import type { IProjectEntity } from '@/entites/IProject'

export interface IProjectRepository {
  search(title?: string, userId?: number): Promise<IProjectEntity[]>
  delete(projectId: number): Promise<IProjectEntity>
  update(projectId: number, data: IUpdateProject): Promise<IProjectEntity>
  create(data: ICreateProject): Promise<IProjectEntity>
}

export class ProjectRepositoryImpl implements IProjectRepository {
  constructor(private readonly projectApi: IProjectApi) {}

  async search(title?: string, userId?: number): Promise<IProjectEntity[]> {
    const res = await this.projectApi.search(title, userId)

    const newRes: IProjectEntity[] = res.map((project) => {
      return {
        id: project.id,
        createdAt: project.createdAt,
        updatedAt: project.updatedAt,
        title: project.title,
        summary: project.summary,
        about: project.about,
        sector: project.sector,
        state: project.state,
        methodologies: project.methodologies,
        startDate: new Date(project.startDate),
        endDate: new Date(project.endDate),
        vacancies: project.vacancies
      }
    })

    return newRes
  }
  async delete(projectId: number): Promise<IProjectEntity> {
    const res = await this.projectApi.delete(projectId)

    const newRes: IProjectEntity = {
      id: res.id,
      createdAt: res.createdAt,
      updatedAt: res.updatedAt,
      title: res.title,
      summary: res.summary,
      about: res.about,
      sector: res.sector,
      state: res.state,
      methodologies: res.methodologies,
      startDate: new Date(res.startDate),
      endDate: new Date(res.endDate),
      vacancies: res.vacancies
    }

    return newRes
  }
  async update(projectId: number, data: IUpdateProject): Promise<IProjectEntity> {
    const res = await this.projectApi.update(projectId, data)

    const newRes: IProjectEntity = {
      id: res.id,
      createdAt: res.createdAt,
      updatedAt: res.updatedAt,
      title: res.title,
      summary: res.summary,
      about: res.about,
      sector: res.sector,
      state: res.state,
      methodologies: res.methodologies,
      startDate: new Date(res.startDate),
      endDate: new Date(res.endDate),
      vacancies: res.vacancies
    }

    return newRes
  }
  async create(data: ICreateProject): Promise<IProjectEntity> {
    const res = await this.projectApi.create(data)

    const newRes: IProjectEntity = {
      id: res.id,
      createdAt: res.createdAt,
      updatedAt: res.updatedAt,
      title: res.title,
      summary: res.summary,
      about: res.about,
      sector: res.sector,
      state: res.state,
      methodologies: res.methodologies,
      startDate: new Date(res.startDate),
      endDate: new Date(res.endDate),
      vacancies: res.vacancies
    }

    return newRes
  }
}
