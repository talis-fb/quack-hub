import { Injectable } from '@nestjs/common';
import { ProjectsRepository } from './project.repository';
import {
  InputProjectData,
  ProjectData,
  ProjectEntity,
  StateProject,
} from './project.entity';
import { UserEntity } from 'src/core/profile/user/user.entity';
import { ProjectNotFoundException } from './project.exceptions';
import { UserRepository } from 'src/core/profile/user/user.repository';
import { UserNotFoundException } from 'src/core/profile/user/user.exceptions';
import { MethodologieEntity } from 'src/methodologies/methodologie.entity';
export abstract class ProjectsService {
  public abstract create(
    data: InputProjectData,
    userId: number,
  ): Promise<ProjectEntity>;
  public abstract update(
    id: number,
    project: InputProjectData,
  ): Promise<ProjectData | null>;
  public abstract getProjectById(id: number): Promise<ProjectEntity | null>;
  public abstract getUsersOfProject(id: number): Promise<UserEntity[]>;
  public abstract search(
    searchTitle?: string,
    userId?: number,
    states?: StateProject[],
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
    data: InputProjectData,
    userId: number,
  ): Promise<ProjectEntity> {
    const userExist = await this.userRepository.getUserById(userId);
    if (!userExist) {
      throw new UserNotFoundException();
    }
    return await this.repo.createProject({ ...data }, userId);
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

  // public async search(
  //   searchTitle?: string,
  //   userId?: number,
  //   states?: StateProject[],
  // ): Promise<ProjectEntity[]> {
  //   return await this.repo.search(searchTitle, userId, states);
  // }

  public async deleteProject(id: number): Promise<ProjectEntity> {
    const project = await this.repo.getProjectById(id);

    if (!project) {
      throw new ProjectNotFoundException();
    }

    return await this.repo.deleteProject(id);
  }

  public async search(
    searchTitle?: string,
    userId?: number,
    states?: StateProject[],
  ): Promise<ProjectEntity[]> {
    let projects = await this.repo.search(searchTitle, userId, states);

    if (userId) {
      const user = await this.userRepository.getUserById(userId);
      if (!user) {
        throw new UserNotFoundException();
      }

      const suggestProject = new AlgoritmSuggestProject();

      projects = suggestProject.suggest(user.methodologies, projects);
    }

    return projects;
  }
}

abstract class SuggestProject {
  abstract suggest(
    userMethodologies: MethodologieEntity[],
    projects: ProjectEntity[],
  ): ProjectEntity[];
}
class AlgoritmSuggestProject implements SuggestProject {
  suggest(
    userMethodologies: MethodologieEntity[],
    projects: ProjectEntity[],
  ): ProjectEntity[] {
    const userVector = userMethodologies.map((methodology) => 1);

    const scoredProjects = projects.map((project) => {
      const projectVector = this.createVector(
        project.methodologies.map((methodology) => methodology.name),
        userMethodologies.map((methodology) => methodology.name),
      );

      const similarity = this.calculateCosineSimilarity(
        userVector,
        projectVector,
      );
      return { project, similarity };
    });

    scoredProjects.sort((a, b) => b.similarity - a.similarity);

    return scoredProjects.map((scoredProject) => scoredProject.project);
  }

  private createVector(
    methodologies: string[],
    referenceMethodologies: string[],
  ): number[] {
    return referenceMethodologies.map((methodology) =>
      methodologies.includes(methodology) ? 1 : 0,
    );
  }
  private calculateCosineSimilarity(vec1: number[], vec2: number[]): number {
    const dotProduct = vec1.reduce(
      (sum, val, index) => sum + val * vec2[index],
      0,
    );
    const magnitude1 = Math.sqrt(vec1.reduce((sum, val) => sum + val * val, 0));
    const magnitude2 = Math.sqrt(vec2.reduce((sum, val) => sum + val * val, 0));
    return magnitude1 && magnitude2
      ? dotProduct / (magnitude1 * magnitude2)
      : 0;
  }
}
