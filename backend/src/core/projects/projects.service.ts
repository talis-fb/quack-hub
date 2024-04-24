import { Injectable } from '@nestjs/common';
import { ProjectsRepository } from './project.repository';
import { ProjectData, ProjectEntity } from './projects.entity';
import { UserEntity } from '../user/user.entity';
import { UserService } from '../user/user.service';
import { RepositoryClientKnownRequestException } from 'src/excpetions/repository/RepositoryClientKnownRequestException';
import { ServiceClientKnownRequestException } from 'src/excpetions/service/ServiceClientKnownRequestException';
import { RepositoryClientValidationException } from 'src/excpetions/repository/RepositoryClientValidationException';
import { ServiceClientValidationException } from 'src/excpetions/service/ServiceClientValidationException';
import { RepositoryClientInitializationException } from 'src/excpetions/repository/RepositoryClientInitializationException';
import { ServiceClientInitializationException } from 'src/excpetions/service/ServiceClientInitializationException';
import { ServiceException } from 'src/excpetions/service/ServiceException';
import { CreateProjectDto } from './dtos/CreateProjectDto';
import { UpdateProjectDto } from './dtos/UpdateProjectDto';

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
    try {
      return await this.repo.createProject({ ...data, userId });
    } catch (error) {
      if (error instanceof RepositoryClientKnownRequestException) {
        throw new ServiceClientKnownRequestException(error.message);
      } else if (error instanceof RepositoryClientValidationException) {
        throw new ServiceClientValidationException(error.message);
      } else if (error instanceof RepositoryClientInitializationException) {
        throw new ServiceClientInitializationException(error.message);
      } else {
        throw new ServiceException(error.message);
      }
    }
  }

  public async update(
    id: number,
    project: Partial<ProjectData>,
  ): Promise<ProjectData | null> {
    try {
      return await this.repo.updateProject(id, project);
    } catch (error) {
      if (error instanceof RepositoryClientKnownRequestException) {
        throw new ServiceClientKnownRequestException(error.message);
      } else if (error instanceof RepositoryClientValidationException) {
        throw new ServiceClientValidationException(error.message);
      } else if (error instanceof RepositoryClientInitializationException) {
        throw new ServiceClientInitializationException(error.message);
      } else {
        throw new ServiceException(error.message);
      }
    }
  }

  public async getProjectById(id: number): Promise<ProjectEntity | null> {
    try {
      const resProject = await this.repo.getProjectById(id);
      return resProject;
    } catch (error) {
      if (error instanceof RepositoryClientKnownRequestException) {
        throw new ServiceClientKnownRequestException(error.message);
      } else if (error instanceof RepositoryClientValidationException) {
        throw new ServiceClientValidationException(error.message);
      } else if (error instanceof RepositoryClientInitializationException) {
        throw new ServiceClientInitializationException(error.message);
      } else {
        throw new ServiceException(error.message);
      }
    }
  }

  public async getUsersOfProject(id: number): Promise<UserEntity[]> {
    try {
      const userIds = await this.repo.findUserIdsOfProject(id);
      return await this.userService.findUsersByIds(userIds);
    } catch (error) {
      if (error instanceof RepositoryClientKnownRequestException) {
        throw new ServiceClientKnownRequestException(error.message);
      } else if (error instanceof RepositoryClientValidationException) {
        throw new ServiceClientValidationException(error.message);
      } else if (error instanceof RepositoryClientInitializationException) {
        throw new ServiceClientInitializationException(error.message);
      } else {
        throw new ServiceException(error.message);
      }
    }
  }

  public async search(
    searchTitle?: string,
    userId?: number,
  ): Promise<ProjectEntity[]> {
    try {
      return await this.repo.search(searchTitle, userId);
    } catch (error) {
      if (error instanceof RepositoryClientKnownRequestException) {
        throw new ServiceClientKnownRequestException(error.message);
      } else if (error instanceof RepositoryClientValidationException) {
        throw new ServiceClientValidationException(error.message);
      } else if (error instanceof RepositoryClientInitializationException) {
        throw new ServiceClientInitializationException(error.message);
      } else {
        throw new ServiceException(error.message);
      }
    }
  }
  public async deleteProject(id: number): Promise<ProjectEntity> {
    try {
      return await this.repo.deleteProject(id);
    } catch (error) {
      if (error instanceof RepositoryClientKnownRequestException) {
        throw new ServiceClientKnownRequestException(error.message);
      } else if (error instanceof RepositoryClientValidationException) {
        throw new ServiceClientValidationException(error.message);
      } else if (error instanceof RepositoryClientInitializationException) {
        throw new ServiceClientInitializationException(error.message);
      } else {
        throw new ServiceException(error.message);
      }
    }
  }
}
