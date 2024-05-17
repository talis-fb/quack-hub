import type { IProjectApi } from '@/apis/project/project.api'
import type { IInputProjectData, IProjectEntity } from '@/entites/IProject'

export interface IProjectRepository {
  search(title?: string, userId?: number, states?: string[]): Promise<IProjectEntity[]>
  getProjectById(id: number): Promise<IProjectEntity>
  delete(projectId: number): Promise<IProjectEntity>
  update(projectId: number, data: IInputProjectData): Promise<IProjectEntity>
  create(data: IInputProjectData): Promise<IProjectEntity>
}

export class ProjectRepositoryImpl implements IProjectRepository {
  constructor(private readonly projectApi: IProjectApi) {}

  async search(title?: string, userId?: number, states?: string[]): Promise<IProjectEntity[]> {
    const res = await this.projectApi.search(title, userId, states)

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
        endDate: project.endDate ? new Date(project.endDate) : null,
        logoUrl: project.logoUrl,
        userId: project.userId
      }
    })

    return newRes
  }

  async getProjectById(id: number): Promise<IProjectEntity> {
    const res = await this.projectApi.getProjectById(id)

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
      endDate: res.endDate ? new Date(res.endDate) : null,
      userId: res.userId,
      logoUrl: res.logoUrl
    }

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
      endDate: res.endDate ? new Date(res.endDate) : null,
      userId: res.userId,
      logoUrl: res.logoUrl
    }

    return newRes
  }
  async update(projectId: number, data: IInputProjectData): Promise<IProjectEntity> {
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
      endDate: res.endDate ? new Date(res.endDate) : null,
      userId: res.userId,
      logoUrl: res.logoUrl
    }

    return newRes
  }
  async create(data: IInputProjectData): Promise<IProjectEntity> {
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
      endDate: res.endDate ? new Date(res.endDate) : null,
      userId: res.userId,
      logoUrl: res.logoUrl
    }

    return newRes
  }
}
