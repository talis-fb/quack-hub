import type { ICreateProject } from '@/types/ICreateProject'
import type { IUpdateProject } from '@/types/IUpdateProject'
import type { IProjectEntity } from '@/entites/IProject'
import type { IProjectRepository } from '@/repositories/project/project.repository'

export interface IProjectService {
  search(title?: string, userId?: number, states?: string[]): Promise<IProjectEntity[]>
  getProjectById(id: number): Promise<IProjectEntity>
  delete(projectId: number): Promise<IProjectEntity>
  update(projectId: number, data: IUpdateProject): Promise<IProjectEntity>
  create(data: ICreateProject): Promise<IProjectEntity>
}

export class ProjectServiceImpl implements IProjectService {
  constructor(private readonly projectRepository: IProjectRepository) {}

  async search(title?: string, userId?: number, states?: string[]): Promise<IProjectEntity[]> {
    const res = await this.projectRepository.search(title, userId, states)

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
}
