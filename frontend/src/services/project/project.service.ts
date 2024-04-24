import type { ICreateProject } from '@/apis/project/types/ICreateProject'
import type { IUpdateProject } from '@/apis/project/types/IUpdateProject'
import type { IProjectEntity } from '@/entites/IProject'
import type { IProjectRepository } from '@/repositories/project/project.repository'

export interface IProjectService {
  search(title?: string, userId?: number): Promise<IProjectEntity[]>
  delete(projectId: number): Promise<IProjectEntity>
  update(projectId: number, data: IUpdateProject): Promise<IProjectEntity>
  create(data: ICreateProject): Promise<IProjectEntity>
}

export class ProjectServiceImpl implements IProjectService {
  constructor(private readonly projectRepository: IProjectRepository) {}

  async search(title?: string, userId?: number): Promise<IProjectEntity[]> {
    const res = await this.projectRepository.search(title, userId)

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
