import { Injectable } from '@nestjs/common';
import { ExperienceData, ExperienceEntity } from '../user/user.entity';
import { PrismaService } from 'src/common/prisma/prisma.service';

export abstract class ExperienceRepository {
  abstract getExperienceById(id: number): Promise<ExperienceEntity | null>;
  abstract createExperience(
    experience: ExperienceData,
  ): Promise<ExperienceEntity>;
  abstract updateExperience(
    id: number,
    experience: Partial<ExperienceData>,
  ): Promise<ExperienceEntity | null>;
}

@Injectable
export class ExperienceRepositoryImpl implements ExperienceRepository {
  constructor(private prisma: PrismaService) {}

  async getExperienceById(id: number): Promise<ExperienceEntity> {
    const output = await this.prisma.experience.findUnique({
      where: {
        id,
      },
    });
    return output;
  }

  async createExperience(
    experience: ExperienceData,
  ): Promise<ExperienceEntity> {
    const output = await this.prisma.experience.create({
      data: {
        ...experience,
      },
    });
    return output;
  }

  async updateExperience(
    id: number,
    experience: Partial<ExperienceData>,
  ): Promise<ExperienceEntity> {
    const output = await this.prisma.experience.update({
      where: {
        id,
      },
      data: experience,
    });
    return output;
  }
}
