import { Injectable } from '@nestjs/common';
import {
  ExperienceData,
  ExperienceEntity,
  ExperienceType,
} from '../experience/experience.entity';
import { PrismaService } from 'src/common/prisma/prisma.service';
import { RepositoryClientKnownRequestException } from 'src/excpetions/repository/RepositoryClientKnownRequestException';
import { RepositoryException } from 'src/excpetions/repository/RepositoryException';
import { RepositoryClientValidationException } from 'src/excpetions/repository/RepositoryClientValidationException';
import { RepositoryClientInitializationException } from 'src/excpetions/repository/RepositoryClientInitializationException';

export abstract class ExperienceRepository {
  abstract getExperienceById(id: number): Promise<ExperienceEntity | null>;
  abstract getExperiencesByUserId(userId: number): Promise<ExperienceEntity[]>;
  abstract getExperiencesUserByType(
    userId: number,
    type: ExperienceType,
  ): Promise<ExperienceEntity[]>;
  abstract createExperience(
    experience: ExperienceData,
  ): Promise<ExperienceEntity>;
  abstract updateExperience(
    id: number,
    experience: Partial<ExperienceData>,
  ): Promise<ExperienceEntity | null>;
  abstract deleteExperience(id: number): Promise<ExperienceEntity | null>;
}

@Injectable()
export class ExperienceRepositoryImpl implements ExperienceRepository {
  constructor(private prisma: PrismaService) {}

  async getExperienceById(id: number): Promise<ExperienceEntity> {
    try {
      const output = await this.prisma.experience.findUnique({
        where: {
          id,
        },
        include: {
          achievements: true,
        },
      });

      return output;
    } catch (error) {
      if (error.code === 'P2025') {
        throw new RepositoryClientKnownRequestException(
          `Error of single constraint violation during consult of experience of ID ${id}!`,
        );
      } else if (error.code === 'P2001') {
        throw new RepositoryClientValidationException(
          `An error of validation occurred during consult of experience of ID ${id}!`,
        );
      } else if (error.code === 'P2002') {
        throw new RepositoryClientInitializationException(
          `Error in inicialization of Database!`,
        );
      } else {
        throw new RepositoryException(
          `An unexpected error occurred during consult of experience with ID ${id}!`,
        );
      }
    }
  }

  async getExperiencesByUserId(userId: number): Promise<ExperienceEntity[]> {
    try {
      const output = await this.prisma.experience.findMany({
        where: {
          userId,
        },
        include: {
          achievements: true,
        },
      });

      return output;
    } catch (error) {
      if (error.code === 'P2025') {
        throw new RepositoryClientKnownRequestException(
          `Error of single constraint violation during consult of experience of user with ID ${userId}!`,
        );
      } else if (error.code === 'P2001') {
        throw new RepositoryClientValidationException(
          `An error of validation occurred during consult of experience of user with ID ${userId}!`,
        );
      } else if (error.code === 'P2002') {
        throw new RepositoryClientInitializationException(
          `Error in inicialization of Database!`,
        );
      } else {
        throw new RepositoryException(
          `An unexpected error occurred during consult of experience of user with ID ${userId}!`,
        );
      }
    }
  }

  async getExperiencesUserByType(
    userId: number,
    type: ExperienceType,
  ): Promise<ExperienceEntity[]> {
    try {
      const output = await this.prisma.experience.findMany({
        where: {
          userId,
          type,
        },
        include: {
          achievements: true,
        },
      });

      return output;
    } catch (error) {
      if (error.code === 'P2025') {
        throw new RepositoryClientKnownRequestException(
          `Error of single constraint violation during consult of experience of user with ID ${userId} and type ${type}!`,
        );
      } else if (error.code === 'P2001') {
        throw new RepositoryClientValidationException(
          `An error of validation occurred during consult of experience of user with ID ${userId} and type ${type}!`,
        );
      } else if (error.code === 'P2002') {
        throw new RepositoryClientInitializationException(
          `Error in inicialization of Database!`,
        );
      } else {
        throw new RepositoryException(
          `An unexpected error occurred during consult of experience of user with ID ${userId} and type ${type}!`,
        );
      }
    }
  }

  async createExperience(
    experience: ExperienceData,
  ): Promise<ExperienceEntity> {
    try {
      const output = await this.prisma.experience.create({
        data: {
          about: experience.about,
          endDate: experience.endDate,
          startDate: experience.startDate,
          title: experience.title,
          type: experience.type,
          userId: experience.userId,
          achievements: {
            create: experience.achievements,
          },
        },
        include: {
          achievements: true,
        },
      });

      return output;
    } catch (error) {
      if (error.code === 'P2025') {
        throw new RepositoryClientKnownRequestException(
          `Error of single constraint violation during create of experience!`,
        );
      } else if (error.code === 'P2001') {
        throw new RepositoryClientValidationException(
          `An error of validation occurred during create of experience!`,
        );
      } else if (error.code === 'P2002') {
        throw new RepositoryClientInitializationException(
          `Error in inicialization of Database!`,
        );
      } else {
        throw new RepositoryException(
          `An unexpected error occurred during create of experience!`,
        );
      }
    }
  }

  async updateExperience(
    id: number,
    experience: Partial<ExperienceData>,
  ): Promise<ExperienceEntity | null> {
    try {
      const { achievements, ...experienceWithoutAchievements } = experience;
      const output = await this.prisma.experience.update({
        where: {
          id,
        },
        data: experienceWithoutAchievements,
        include: {
          achievements: true,
        },
      });

      return output;
    } catch (error) {
      if (error.code === 'P2025') {
        throw new RepositoryClientKnownRequestException(
          `Error of single constraint violation during update of experience with ID ${id}!`,
        );
      } else if (error.code === 'P2001') {
        throw new RepositoryClientValidationException(
          `An error of validation occurred during update of experience with ID ${id}!`,
        );
      } else if (error.code === 'P2002') {
        throw new RepositoryClientInitializationException(
          `Error in inicialization of Database!`,
        );
      } else {
        console.log(error);
        throw new RepositoryException(
          `An unexpected error occurred during update of experience with ID ${id}!`,
        );
      }
    }
  }

  async deleteExperience(id: number): Promise<ExperienceEntity> {
    try {
      const output = await this.prisma.experience.delete({
        where: {
          id,
        },
        include: {
          achievements: true,
        },
      });

      return output;
    } catch (error) {
      if (error.code === 'P2025') {
        throw new RepositoryClientKnownRequestException(
          `Error of single constraint violation during exclusion of experience with ID ${id}!`,
        );
      } else if (error.code === 'P2001') {
        throw new RepositoryClientValidationException(
          `An error of validation occurred during exclusion of experience with ID ${id}!`,
        );
      } else if (error.code === 'P2002') {
        throw new RepositoryClientInitializationException(
          `Error in inicialization of Database!`,
        );
      } else {
        throw new RepositoryException(
          `An unexpected error occurred during exclusion of experience with ID ${id}!`,
        );
      }
    }
  }
}
