import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/common/prisma/prisma.service';
import {
  InputProjectData,
  ProjectEntity,
  StateProject,
} from 'src/core/projects/project/project.entity';

export abstract class ProjectsRepository {
  abstract getProjectById(id: number): Promise<ProjectEntity | null>;
  abstract createProject(project: InputProjectData): Promise<ProjectEntity>;
  abstract updateProject(
    id: number,
    project: Partial<InputProjectData>,
  ): Promise<ProjectEntity | null>;
  abstract findUserIdsOfProject(id: number): Promise<number[]>;
  public abstract search(
    searchTitle?: string,
    userId?: number,
    states?: StateProject[],
  ): Promise<ProjectEntity[]>;
  public abstract deleteProject(id: number): Promise<ProjectEntity>;
}

@Injectable()
export class ProjectsRepositoryImpl implements ProjectsRepository {
  constructor(private prisma: PrismaService) {}

  async getProjectById(id: number): Promise<ProjectEntity | null> {
    const output = await this.prisma.project.findUnique({
      where: {
        id,
      },
      include: {
        methodologies: {
          include: {
            Methodologie: true,
          },
        },
      },
    });

    return {
      ...output,
      methodologies: output.methodologies.map((el) => el.Methodologie),
    };
  }

  async createProject(project: InputProjectData): Promise<ProjectEntity> {
    const { methodologies, ...rest } = project;

    const output = await this.prisma.project.create({
      data: {
        ...rest,
        methodologies: {
          create: methodologies.map((el) => ({
            Methodologie: {
              connect: {
                id: el.id,
              },
            },
          })),
        },
      },
      include: {
        methodologies: {
          include: {
            Methodologie: true,
          },
        },
      },
    });

    return {
      ...output,
      methodologies: output.methodologies.map((el) => el.Methodologie),
    };
  }

  async updateProject(
    id: number,
    project: Partial<InputProjectData>,
  ): Promise<ProjectEntity | null> {
    const { methodologies, ...rest } = project;

    const output = await this.prisma.project.update({
      where: {
        id,
      },

      data: {
        ...rest,
        methodologies: {
          deleteMany: {},
          create: methodologies.map((el) => ({
            Methodologie: {
              connect: {
                id: el.id,
              },
            },
          })),
        },
      },
      include: {
        methodologies: {
          include: {
            Methodologie: true,
          },
        },
      },
    });
    return {
      ...output,
      methodologies: output.methodologies.map((el) => el.Methodologie),
    };
  }

  async findProjects(ids: number[]): Promise<ProjectEntity[]> {
    const output = await this.prisma.project.findMany({
      where: {
        id: {
          in: ids,
        },
      },

      include: {
        methodologies: {
          include: {
            Methodologie: true,
          },
        },
      },
    });

    return output.map((el) => ({
      ...el,
      methodologies: el.methodologies.map((el) => el.Methodologie),
    }));
  }

  async findUserIdsOfProject(id: number): Promise<number[]> {
    const output = await this.prisma.project.findMany({
      select: {
        experiences: {
          select: {
            userId: true,
          },
        },
      },
      where: {
        id,
      },
    });
    return output.flatMap((el) => el.experiences.map((el) => el.userId));
  }

  public async search(
    searchTitle?: string,
    userId?: number,
    states?: StateProject[],
  ): Promise<ProjectEntity[]> {
    const output = await this.prisma.project.findMany({
      where: {
        title: {
          contains: searchTitle,
          mode: 'insensitive',
        },
        userId,
        state: {
          in: states,
        },
      },

      include: {
        methodologies: {
          include: {
            Methodologie: true,
          },
        },
      },
    });

    return output.map((el) => ({
      ...el,
      methodologies: el.methodologies.map((el) => el.Methodologie),
    }));
  }

  async deleteProject(id: number): Promise<ProjectEntity> {
    const output = await this.prisma.project.delete({
      where: {
        id,
      },

      include: {
        methodologies: {
          include: {
            Methodologie: true,
          },
        },
      },
    });

    return {
      ...output,
      methodologies: output.methodologies.map((el) => el.Methodologie),
    };
  }
}
