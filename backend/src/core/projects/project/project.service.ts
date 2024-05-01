import { Injectable } from '@nestjs/common';
import { ProjectsRepository } from './project.repository';
import { ProjectData, ProjectEntity } from './project.entity';
import { UserEntity } from 'src/core/profile/user/user.entity';
import { CreateProjectDto } from './dtos/CreateProjectDto';
import { UpdateProjectDto } from './dtos/UpdateProjectDto';
import { ProjectNotFoundException } from './project.exceptions';
import { UserRepository } from 'src/core/profile/user/user.repository';
import { UserNotFoundException } from 'src/core/profile/user/user.exceptions';

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
    private userRepository: UserRepository,
  ) {}

  public async create(
    data: CreateProjectDto,
    userId: number,
  ): Promise<ProjectEntity> {
    const userExist = await this.userRepository.getUserById(userId);
    if (!userExist) {
      throw new UserNotFoundException();
    }
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
    if (!resProject) {
      throw new ProjectNotFoundException();
    }
    return resProject;
  }

  public async getUsersOfProject(id: number): Promise<UserEntity[]> {
    const project = await this.getProjectById(id);
    if (!project) {
      throw new ProjectNotFoundException();
    }

    const userIds = await this.repo.findUserIdsOfProject(id);
    return await this.userRepository.findUsers(userIds);
  }

  public async search(
    searchTitle?: string,
    userId?: number,
  ): Promise<ProjectEntity[]> {
    return await this.repo.search(searchTitle, userId);
  }
  public async deleteProject(id: number): Promise<ProjectEntity> {
    const project = await this.repo.getProjectById(id);

    if (!project) {
      throw new ProjectNotFoundException();
    }

    return await this.repo.deleteProject(id);
  }
}
