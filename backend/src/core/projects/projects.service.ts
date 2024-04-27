import { Injectable } from '@nestjs/common';
import { ProjectsRepository } from './project.repository';
import { ProjectData, ProjectEntity } from './projects.entity';
import { UserEntity } from '../user/user.entity';
import { UserService } from '../user/user.service';
import { CreateProjectDto } from './dtos/CreateProjectDto';
import { UpdateProjectDto } from './dtos/UpdateProjectDto';

import { NotFoundException } from 'src/common/exceptions/ServiceException'

export abstract class ProjectsService {
  public abstract create(
    data: CreateProjectDto,
    userId: number,
  ): Promise<ProjectEntity>;
  public abstract update(
    id: number,
    project: UpdateProjectDto,
  ): Promise<ProjectData | null>;
  public abstract getProjectById(id: number): Promise<ProjectEntity | null>;
  public abstract getUsersOfProject(id: number): Promise<UserEntity[]>;
  public abstract search(
    searchTitle?: string,
    userId?: number,
  ): Promise<ProjectEntity[]>;
  public abstract deleteProject(id: number): Promise<ProjectEntity>;
}

@Injectable()
export class ProjectsServiceImpl implements ProjectsService {
  constructor(
    private repo: ProjectsRepository,
    private userService: UserService,
  ) {}

  public async create(
    data: CreateProjectDto,
    userId: number,
  ): Promise<ProjectEntity> {
      return await this.repo.createProject({ ...data, userId });
  }

  public async update(
    id: number,
    project: Partial<ProjectData>,
  ): Promise<ProjectData | null> {
      return await this.repo.updateProject(id, project);
  }

  public async getProjectById(id: number): Promise<ProjectEntity | null> {
      const resProject = await this.repo.getProjectById(id);
      return resProject;
  }

  public async getUsersOfProject(id: number): Promise<UserEntity[]> {
      const userIds = await this.repo.findUserIdsOfProject(id);
      return await this.userService.findUsersByIds(userIds);
  }

  public async search(
    searchTitle?: string,
    userId?: number,
  ): Promise<ProjectEntity[]> {
      return await this.repo.search(searchTitle, userId);
  }
  public async deleteProject(id: number): Promise<ProjectEntity> {
      const project = await this.repo.getProjectById(id);

      if(!project) {
        throw new NotFoundException()
      }

      return await this.repo.deleteProject(id);
  }
}
