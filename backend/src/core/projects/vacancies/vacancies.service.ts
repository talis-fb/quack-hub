import { Injectable } from '@nestjs/common';
import { VacancyData, VacancyEntity } from './vacancies.entity';
import { UpdateVacancyDto } from './dtos/UpdateVacancyDto';
import { VacanciesRepository } from './vacancies.repository';

export abstract class VacanciesService {
  abstract create(data: VacancyData): Promise<VacancyEntity>;
  abstract update(id: number, data: UpdateVacancyDto): Promise<VacancyEntity>;
  abstract delete(id: number): Promise<VacancyEntity>;
  abstract findOneById(id: number): Promise<VacancyEntity>;
  abstract findVacanciesByProjectId(
    projectId: number,
  ): Promise<VacancyEntity[]>;
  abstract searchVacancies(searchTitle: string): Promise<VacancyEntity[]>;
}

@Injectable()
export class VacanciesServiceImpl implements VacanciesService {
  constructor(private readonly vacanciesRepository: VacanciesRepository) {}

  async create(data: VacancyData): Promise<VacancyEntity> {
    const output = await this.vacanciesRepository.create(data);
    return output;
  }
  async update(id: number, data: UpdateVacancyDto): Promise<VacancyEntity> {
    const output = await this.vacanciesRepository.update(id, data);
    return output;
  }
  async delete(id: number): Promise<VacancyEntity> {
    const output = await this.vacanciesRepository.delete(id);
    return output;
  }
  async findOneById(id: number): Promise<VacancyEntity> {
    const output = await this.vacanciesRepository.findOneById(id);
    return output;
  }
  async findVacanciesByProjectId(projectId: number): Promise<VacancyEntity[]> {
    const output =
      await this.vacanciesRepository.findVacanciesByProjectId(projectId);
    return output;
  }

  async searchVacancies(searchTitle: string): Promise<VacancyEntity[]> {
    const output = await this.vacanciesRepository.searchVacancies(searchTitle);
    return output;
  }
}
