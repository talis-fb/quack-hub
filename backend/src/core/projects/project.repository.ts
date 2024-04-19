import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../common/prisma/prisma.service';
import { ProjectData, ProjectEntity } from './projects.entity';
import { RepositoryClientKnownRequestException } from 'src/excpetions/repository/RepositoryClientKnownRequestException';
import { RepositoryClientValidationException } from 'src/excpetions/repository/RepositoryClientValidationException';
import { RepositoryClientInitializationException } from 'src/excpetions/repository/RepositoryClientInitializationException';
import { RepositoryException } from 'src/excpetions/repository/RepositoryException';

export abstract class ProjectsRepository {
  abstract getProjectById(id: number): Promise<ProjectEntity | null>;
  abstract createProject(project: ProjectData): Promise<ProjectEntity>;
  abstract updateProject(
    id: number,
    project: Partial<ProjectData>,
  ): Promise<ProjectEntity | null>;
  abstract findUserIdsOfProject(id: number): Promise<number[]>;
  public abstract search(searchName: string): Promise<ProjectEntity[]>;
  public abstract deleteProject(id: number): Promise<ProjectEntity>;
}

@Injectable()
export class ProjectsRepositoryImpl implements ProjectsRepository {
  constructor(private prisma: PrismaService) {}

  async getProjectById(id: number): Promise<ProjectEntity | null> {
    try {
      const output = await this.prisma.project.findUnique({
        where: {
          id,
        },
        include: {
          vacancies: true,
        },
      });
      return output;
    } catch (error) {
      if (error.code === 'P2025') {
        throw new RepositoryClientKnownRequestException(
          `Error of single constraint violation during search of project with ID ${id}!`,
        );
      } else if (error.code === 'P2001') {
        throw new RepositoryClientValidationException(
          `An error of validation occurred during search of project with ID ${id}!`,
        );
      } else if (error.code === 'P2002') {
        throw new RepositoryClientInitializationException(
          `Error in inicialization of Database!`,
        );
      } else {
        throw new RepositoryException(
          `An unexpected error occurred during search of project with ID ${id}!`,
        );
      }
    }
  }

  async createProject(project: ProjectData): Promise<ProjectEntity> {
    // TODO: Ver um melhor jeito pra não precisar desse without. Criar uma nova tipagem ou algo do tipo
    const { vacancies, ...projectWithoutVacancies } = project;

    try {
      const output = await this.prisma.project.create({
        data: {
          ...projectWithoutVacancies,
          vacancies: {
            create: vacancies,
          },
        },

        include: {
          vacancies: true,
        },
      });
      return output;
    } catch (error) {
      if (error.code === 'P2025') {
        throw new RepositoryClientKnownRequestException(
          `Error of single constraint violation during create of project!`,
        );
      } else if (error.code === 'P2001') {
        throw new RepositoryClientValidationException(
          `An error of validation occurred during create of project!`,
        );
      } else if (error.code === 'P2002') {
        throw new RepositoryClientInitializationException(
          `Error in inicialization of Database!`,
        );
      } else {
        throw new RepositoryException(
          `An unexpected error occurred during create of project!`,
        );
      }
    }
  }

  async updateProject(
    id: number,
    project: Partial<ProjectData>,
  ): Promise<ProjectEntity | null> {
    // TODO: Ver um melhor jeito pra não precisar desse without. Criar uma nova tipagem ou algo do tipo
    const { vacancies, ...projectWithoutVacancies } = project;

    try {
      const output = await this.prisma.project.update({
        where: {
          id,
        },
        include: {
          vacancies: true,
        },
        data: projectWithoutVacancies,
      });
      return output;
    } catch (error) {
      if (error.code === 'P2025') {
        throw new RepositoryClientKnownRequestException(
          `Error of single constraint violation during update of project with ID ${id}!`,
        );
      } else if (error.code === 'P2001') {
        throw new RepositoryClientValidationException(
          `An error of validation occurred during update of project with ID ${id}!`,
        );
      } else if (error.code === 'P2002') {
        throw new RepositoryClientInitializationException(
          `Error in inicialization of Database!`,
        );
      } else {
        throw new RepositoryException(
          `An unexpected error occurred during update of project with ID ${id}!`,
        );
      }
    }
  }

  async findProjects(ids: number[]): Promise<ProjectEntity[]> {
    try {
      const output = await this.prisma.project.findMany({
        where: {
          id: {
            in: ids,
          },
        },
        include: {
          vacancies: true,
        },
      });
      return output;
    } catch (error) {
      if (error.code === 'P2025') {
        throw new RepositoryClientKnownRequestException(
          `Error of single constraint violation during search of project!`,
        );
      } else if (error.code === 'P2001') {
        throw new RepositoryClientValidationException(
          `An error of validation occurred during search of project!`,
        );
      } else if (error.code === 'P2002') {
        throw new RepositoryClientInitializationException(
          `Error in inicialization of Database!`,
        );
      } else {
        throw new RepositoryException(
          `An unexpected error occurred during search of projects!`,
        );
      }
    }
  }

  async findUserIdsOfProject(id: number): Promise<number[]> {
    try {
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
    } catch (error) {
      if (error.code === 'P2025') {
        throw new RepositoryClientKnownRequestException(
          `Error of single constraint violation during search of users of project with ID ${id}!`,
        );
      } else if (error.code === 'P2001') {
        throw new RepositoryClientValidationException(
          `An error of validation occurred during search of users of project with ID ${id}!`,
        );
      } else if (error.code === 'P2002') {
        throw new RepositoryClientInitializationException(
          `Error in inicialization of Database!`,
        );
      } else {
        throw new RepositoryException(
          `An unexpected error occurred during search of users of project with ID ${id}!`,
        );
      }
    }
  }

  public async search(searchName: string): Promise<ProjectEntity[]> {
    try {
      const output = await this.prisma.project.findMany({
        where: {
          title: {
            contains: searchName,
            mode: 'insensitive',
          },
        },
        include: {
          vacancies: true,
        },
      });

      return output;
    } catch (error) {
      if (error.code === 'P2025') {
        throw new RepositoryClientKnownRequestException(
          `Error of single constraint violation during search of projects with name ${searchName}!`,
        );
      } else if (error.code === 'P2001') {
        throw new RepositoryClientValidationException(
          `An error of validation occurred during search of projects with name ${searchName}!`,
        );
      } else if (error.code === 'P2002') {
        throw new RepositoryClientInitializationException(
          `Error in inicialization of Database!`,
        );
      } else {
        throw new RepositoryException(
          `An unexpected error occurred during search of projects with name ${searchName}!`,
        );
      }
    }
  }

  async deleteProject(id: number): Promise<ProjectEntity> {
    try {
      const output = await this.prisma.project.delete({
        where: {
          id,
        },
        include: {
          vacancies: true,
        },
      });

      return output;
    } catch (error) {
      if (error.code === 'P2025') {
        throw new RepositoryClientKnownRequestException(
          `Error of single constraint violation during delete of project with ID ${id}!`,
        );
      } else if (error.code === 'P2001') {
        throw new RepositoryClientValidationException(
          `An error of validation occurred during delete of project with ID ${id}!`,
        );
      } else if (error.code === 'P2002') {
        throw new RepositoryClientInitializationException(
          `Error in inicialization of Database!`,
        );
      } else {
        throw new RepositoryException(
          `An unexpected error occurred during delete of project with ID ${id}!`,
        );
      }
    }
  }
}
