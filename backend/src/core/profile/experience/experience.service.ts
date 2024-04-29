import { Injectable } from '@nestjs/common';
import {
  ExperienceEntity,
  ExperienceType,
} from 'src/core/profile/experience/experience.entity';
import { ExperienceRepository } from 'src/core/profile/experience/experience.repository';
import { UpdateExperienceDto } from 'src/core/profile/experience/dtos/UpdateExperienceDto';
import { CreateExperienceDto } from 'src/core/profile/experience/dtos/CreateExperienceDto';

@Injectable()
export abstract class ExperienceService {
  abstract getExperienceById(id: number): Promise<ExperienceEntity | null>;

  abstract getExperiencesByUserId(
    userId: number,
    type?: ExperienceType,
  ): Promise<ExperienceEntity[]>;

  abstract createExperience(
    experience: CreateExperienceDto,
    userid: number,
  ): Promise<ExperienceEntity>;

  abstract updateExperience(
    id: number,
    updateExperienceDto: UpdateExperienceDto,
  ): Promise<ExperienceEntity | null>;

  abstract deleteExperience(id: number): Promise<ExperienceEntity | null>;
}

@Injectable()
export class ExperienceServiceImpl implements ExperienceService {
  constructor(private repo: ExperienceRepository) {}

  public async getExperienceById(id: number): Promise<ExperienceEntity | null> {
    return await this.repo.getExperienceById(id);
  }

  public async getExperiencesByUserId(
    userId: number,
    type?: ExperienceType,
  ): Promise<ExperienceEntity[]> {
      return await this.repo.getExperiencesByUserId(
        userId,
        type,
      );
  }

  public async createExperience(
    experience: CreateExperienceDto,
    userId: number,
  ): Promise<ExperienceEntity> {
      return await this.repo.createExperience({
        ...experience,
        userId,
      });
  }

  public async updateExperience(
    id: number,
    updateExperienceDto: UpdateExperienceDto,
  ): Promise<ExperienceEntity> {
      return await this.repo.updateExperience(
        id,
        updateExperienceDto,
      );
  }

  public async deleteExperience(id: number): Promise<ExperienceEntity> {
      return await this.repo.deleteExperience(id);
  }
}
