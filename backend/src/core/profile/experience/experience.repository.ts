import { Injectable } from '@nestjs/common';
import {
  ExperienceData,
  ExperienceEntity,
  ExperienceType,
} from 'src/core/profile/experience/experience.entity';
import { PrismaService } from 'src/common/prisma/prisma.service';

export abstract class ExperienceRepository {
  abstract getExperienceById(id: number): Promise<ExperienceEntity | null>;
  abstract getExperiencesByUserId(
    userId: number,
    type?: ExperienceType,
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
    const output = await this.prisma.experience.findUnique({
      where: {
        id,
      },
      include: {
        achievements: true,
      },
    });

    return output;
  }

  async getExperiencesByUserId(
    userId: number,
    type?: ExperienceType,
  ): Promise<ExperienceEntity[]> {
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
  }

  async createExperience(
    experience: ExperienceData,
  ): Promise<ExperienceEntity> {
    // TODO: Ver um melhor jeito pra não precisar desse without. Criar uma nova tipagem ou algo do tipo
    const { achievements, ...experienceWithoutahievements } = experience;

    const output = await this.prisma.experience.create({
      data: {
        ...experienceWithoutahievements,
        achievements: {
          create: achievements,
        },
      },
      include: {
        achievements: true,
      },
    });

    return output;
  }

  async updateExperience(
    id: number,
    experience: Partial<ExperienceData>,
  ): Promise<ExperienceEntity | null> {
    // TODO: Ver um melhor jeito pra não precisar desse without. Criar uma nova tipagem ou algo do tipo

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
  }

  async deleteExperience(id: number): Promise<ExperienceEntity> {
    const output = await this.prisma.experience.delete({
      where: {
        id,
      },
      include: {
        achievements: true,
      },
    });

    return output;
  }
}
