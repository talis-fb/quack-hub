import type { IProjectApi, IProjectImported } from '@/apis/project/project.api'
import type { IInputProjectData, IProjectEntity } from '@/entites/IProject'

export interface IProjectService {
  search(title?: string, userId?: number, states?: string[]): Promise<IProjectEntity[]>
  getProjectById(id: number): Promise<IProjectEntity>
  delete(projectId: number): Promise<IProjectEntity>
  update(projectId: number, data: IInputProjectData): Promise<IProjectEntity>
  create(data: IInputProjectData): Promise<IProjectEntity>
  importProject(username: string, projectName: string): Promise<IProjectImported>
}

export class ProjectServiceImpl implements IProjectService {
  constructor(private readonly projectApi: IProjectApi) {}

  async search(title?: string, userId?: number, states?: string[]): Promise<IProjectEntity[]> {
    return await this.projectApi.search(title, userId, states)
  }

  async getProjectById(id: number): Promise<IProjectEntity> {
    return await this.projectApi.getProjectById(id)
  }

  async delete(projectId: number): Promise<IProjectEntity> {
    return await this.projectApi.delete(projectId)
  }

  async update(projectId: number, data: IInputProjectData): Promise<IProjectEntity> {
    return await this.projectApi.update(projectId, data)
  }

  async create(data: IInputProjectData): Promise<IProjectEntity> {
    return await this.projectApi.create(data)
  }

  async importProject(username: string, projectName: string): Promise<IProjectImported> {
    return await this.projectApi.importProject(username, projectName)
  }
}
