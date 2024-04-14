import { Injectable, NotFoundException } from '@nestjs/common';
import { ExperienceData, ExperienceEntity } from '../user/user.entity';
import { ExperienceRepository } from './experience.repository';
import { UserService } from '../user/user.service';
import { UpdateExperienceDto } from './dtos/UpdateExperienceDto';

@Injectable()
export abstract class ExperienceService {
  abstract getExperienceById(id: number): Promise<ExperienceEntity | null>;

  abstract getExperiencesByUserId(userId: number): Promise<ExperienceEntity[]>;

  abstract createExperience(
    experience: ExperienceData,
  ): Promise<ExperienceEntity>;

  abstract updateExperience(
    id: number,
    updateExperienceDto: UpdateExperienceDto,
  ): Promise<ExperienceEntity | null>;

  abstract deleteExperience(id: number): Promise<ExperienceEntity | null>;
}

@Injectable()
export class ExperienceServiceImpl implements ExperienceService {
  constructor(
    private repo: ExperienceRepository,
    private userService: UserService,
  ) {}

  public async getExperienceById(id: number): Promise<ExperienceEntity> {
    const resExperience = await this.repo.getExperienceById(id);
    if (!resExperience) {
      throw new NotFoundException(`Experience ID ${id} not found!`);
    } else {
      return resExperience;
    }
  }

  public async getExperiencesByUserId(
    userId: number,
  ): Promise<ExperienceEntity[]> {
    const resExperiences = await this.repo.getExperiencesByUserId(userId);
    console.log(resExperiences);
    if (!resExperiences) {
      throw new NotFoundException(
        `Experiences of user with ID ${userId} not found!`,
      );
    } else {
      return resExperiences;
    }
  }

  public async createExperience(
    data: ExperienceData,
  ): Promise<ExperienceEntity> {
    return await this.repo.createExperience(data);
  }

  public async updateExperience(
    id: number,
    updateExperienceDto: UpdateExperienceDto,
  ): Promise<ExperienceEntity> {
    return this.repo.updateExperience(id, updateExperienceDto);
  }

  public async deleteExperience(id: number): Promise<ExperienceEntity> {
    return this.repo.deleteExperience(id);
  }
}
