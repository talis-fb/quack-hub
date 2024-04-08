import { Injectable } from '@nestjs/common';
import { ProjectsRepository } from './project.repository';
import { ProjectData, ProjectEntity } from './projects.entity';
import { UserEntity } from '../user/user.entity';

export abstract class ProjectsService {
    public abstract create(id: number, data: ProjectData): Promise<ProjectEntity>;
    public abstract update(
      id: number,
      user: ProjectData,
    ): Promise<ProjectData | null>;
  public abstract getProjectById(id: number): Promise<ProjectEntity | null>;
  public abstract getUsersOfProject(id: number): Promise<UserEntity[]>;
}

@Injectable()
export class ProjectsServiceImpl implements ProjectsService {
  constructor(private repo: ProjectsRepository) {}

  public async create(id: number, data: ProjectData): Promise<ProjectEntity> {
    return await this.repo.createProject(data);
  }

  public async update(
    id: number,
    project: ProjectData,
  ): Promise<ProjectData | null> {
    return await this.repo.updateProject(id, project);      
  }

  public async getProjectById(id: number): Promise<ProjectEntity | null> {
    return await this.repo.getProjectById(id);
  }

  public async getUsersOfProject(id: number): Promise<UserEntity[]> {
    return await this.repo.findUsersOfProject(id);
  }
}
