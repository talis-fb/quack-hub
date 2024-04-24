import { Injectable } from '@nestjs/common';
import {
  ExperienceData,
  ExperienceEntity,
  ExperienceType,
} from '../experience/experience.entity';
import { ExperienceRepository } from './experience.repository';
import { UserService } from '../user/user.service';
import { UpdateExperienceDto } from './dtos/UpdateExperienceDto';
import { RepositoryClientKnownRequestException } from 'src/excpetions/repository/RepositoryClientKnownRequestException';
import { ServiceClientKnownRequestException } from 'src/excpetions/service/ServiceClientKnownRequestException';
import { RepositoryClientValidationException } from 'src/excpetions/repository/RepositoryClientValidationException';
import { ServiceClientValidationException } from 'src/excpetions/service/ServiceClientValidationException';
import { RepositoryClientInitializationException } from 'src/excpetions/repository/RepositoryClientInitializationException';
import { ServiceClientInitializationException } from 'src/excpetions/service/ServiceClientInitializationException';
import { ServiceException } from 'src/excpetions/service/ServiceException';
import { CreateExperienceDto } from './dtos/CreateExperienceDto';

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
    try {
      const resExperience = await this.repo.getExperienceById(id);
      return resExperience;
    } catch (error) {
      if (error instanceof RepositoryClientKnownRequestException) {
        throw new ServiceClientKnownRequestException(error.message);
      } else if (error instanceof RepositoryClientValidationException) {
        throw new ServiceClientValidationException(error.message);
      } else if (error instanceof RepositoryClientInitializationException) {
        throw new ServiceClientInitializationException(error.message);
      } else {
        throw new ServiceException(error.message);
      }
    }
  }

  public async getExperiencesByUserId(
    userId: number,
    type?: ExperienceType,
  ): Promise<ExperienceEntity[]> {
    try {
      const resExperiences = await this.repo.getExperiencesByUserId(
        userId,
        type,
      );
      return resExperiences;
    } catch (error) {
      if (error instanceof RepositoryClientKnownRequestException) {
        throw new ServiceClientKnownRequestException(error.message);
      } else if (error instanceof RepositoryClientValidationException) {
        throw new ServiceClientValidationException(error.message);
      } else if (error instanceof RepositoryClientInitializationException) {
        throw new ServiceClientInitializationException(error.message);
      } else {
        throw new ServiceException(error.message);
      }
    }
  }

  public async createExperience(
    experience: CreateExperienceDto,
    userId: number,
  ): Promise<ExperienceEntity> {
    try {
      const resExperience = await this.repo.createExperience({
        ...experience,
        userId,
      });
      return resExperience;
    } catch (error) {
      if (error instanceof RepositoryClientKnownRequestException) {
        throw new ServiceClientKnownRequestException(error.message);
      } else if (error instanceof RepositoryClientValidationException) {
        throw new ServiceClientValidationException(error.message);
      } else if (error instanceof RepositoryClientInitializationException) {
        throw new ServiceClientInitializationException(error.message);
      } else {
        throw new ServiceException(error.message);
      }
    }
  }

  public async updateExperience(
    id: number,
    updateExperienceDto: UpdateExperienceDto,
  ): Promise<ExperienceEntity> {
    try {
      const resExperience = await this.repo.updateExperience(
        id,
        updateExperienceDto,
      );
      return resExperience;
    } catch (error) {
      if (error instanceof RepositoryClientKnownRequestException) {
        throw new ServiceClientKnownRequestException(error.message);
      } else if (error instanceof RepositoryClientValidationException) {
        throw new ServiceClientValidationException(error.message);
      } else if (error instanceof RepositoryClientInitializationException) {
        throw new ServiceClientInitializationException(error.message);
      } else {
        throw new ServiceException(error.message);
      }
    }
  }

  public async deleteExperience(id: number): Promise<ExperienceEntity> {
    try {
      const resExperience = await this.repo.deleteExperience(id);
      return resExperience;
    } catch (error) {
      if (error instanceof RepositoryClientKnownRequestException) {
        throw new ServiceClientKnownRequestException(error.message);
      } else if (error instanceof RepositoryClientValidationException) {
        throw new ServiceClientValidationException(error.message);
      } else if (error instanceof RepositoryClientInitializationException) {
        throw new ServiceClientInitializationException(error.message);
      } else {
        throw new ServiceException(error.message);
      }
    }
  }
}
