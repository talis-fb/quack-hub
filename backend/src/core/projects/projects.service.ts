import { Injectable } from '@nestjs/common';
import { ProjectsRepository } from './project.repository';
import { ProjectData, ProjectEntity } from './projects.entity';
import { UserEntity } from '../user/user.entity';
import { UserService } from '../user/user.service';
import { ServiceNotFoundException } from 'src/excpetions/service/ServiceNotFoundException';

export abstract class ProjectsService {
  public abstract create(data: ProjectData): Promise<ProjectEntity>;
  public abstract update(
    id: number,
    project: Partial<ProjectData>,
  ): Promise<ProjectData | null>;
  public abstract getProjectById(id: number): Promise<ProjectEntity>;
  public abstract getUsersOfProject(id: number): Promise<UserEntity[]>;
  public abstract search(searchName: string): Promise<ProjectEntity[]>;
}

@Injectable()
export class ProjectsServiceImpl implements ProjectsService {
  constructor(private repo: ProjectsRepository, private userService: UserService) {}
 

  public async create(data: ProjectData): Promise<ProjectEntity> {
    return await this.repo.createProject(data);
  }

  public async update(
    id: number,
    project: Partial<ProjectData>,
  ): Promise<ProjectData | null> {
    return await this.repo.updateProject(id, project);
  }

  public async getProjectById(id: number): Promise<ProjectEntity> {
    const resProject = await this.repo.getProjectById(id);
    if (!resProject) {
      throw new ServiceNotFoundException(`Project with ID ${id} not found!`);
    }
    return resProject;
  }

  public async getUsersOfProject(id: number): Promise<UserEntity[]> {
    const userIds = await this.repo.findUserIdsOfProject(id);
    return await this.userService.findUsersByIds(userIds);
  }
  
  public async search(searchName: string): Promise<ProjectEntity[]> {
    return await this.repo.search(searchName);
  }
}
