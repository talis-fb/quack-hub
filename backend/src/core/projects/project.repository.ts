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