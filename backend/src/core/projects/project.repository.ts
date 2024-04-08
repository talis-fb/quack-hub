import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../common/prisma/prisma.service';
import { ProjectData, ProjectEntity } from './projects.entity';
import { UserEntity } from '../user/user.entity';

export abstract class ProjectsRepository {
  abstract getProjectById(id: number): Promise<ProjectEntity | null>;
  abstract createProject(project: ProjectData): Promise<ProjectEntity>;
  abstract updateProject(id: number, project: Partial<ProjectData>): Promise<ProjectEntity | null>;
  abstract findUsersOfProject(id: number): Promise<UserEntity[]>;
}


@Injectable()
export class ProjectsRepositoryImpl implements ProjectsRepository {
  constructor(private prisma: PrismaService) {}

  async getProjectById(id: number): Promise<ProjectEntity | null> {
    const output = await this.prisma.project.findUnique({
      where: {
        id,
      },
    });
    return output;
  }

  async createProject(project: ProjectData): Promise<ProjectEntity> {
    const output = await this.prisma.project.create({
      data: project,
    });
    return output;
  }

  async updateProject(id: number, project: Partial<ProjectData>): Promise<ProjectEntity | null> {
    const output = await this.prisma.project.update({
      where: {
        id,
      },
      data: project,
    });
    return output;
  }

  async findUsersOfProject(id: number): Promise<UserEntity[]> {
    const output = await this.prisma.user.findMany({
      where: {
        projects: {
          some: {
            id,
          },
        },
      },
    });
    return output;
  }

  

}