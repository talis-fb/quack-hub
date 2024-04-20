import { Injectable } from '@nestjs/common';
import { VacancyData, VacancyEntity } from './vacancies.entity';
import { UpdateVacancyDto } from './dtos/UpdateVacancyDto';
import { VacanciesRepository } from './vacancies.repository';

export abstract class VacanciesService {
  abstract create(data: VacancyData): Promise<VacancyEntity>;
  abstract update(
    id: number,
    data: UpdateVacancyDto,
  ): Promise<VacancyEntity>;
  abstract delete(id: number): Promise<VacancyEntity>;
  abstract findOneById(id: number): Promise<VacancyEntity>;
  abstract findVacanciesByProjectId(
    projectId: number,
  ): Promise<VacancyEntity[]>;
}

@Injectable()
export class VacanciesServiceImpl implements VacanciesService {
  constructor(private readonly vacanciesRepository: VacanciesRepository) {}

  async create(data: VacancyData): Promise<VacancyEntity> {
    const output = this.vacanciesRepository.create(data);
    return output;
  }
  update(id: number, data: UpdateVacancyDto): Promise<VacancyEntity> {
    const output = this.vacanciesRepository.update(id, data);
    return output;
  }
  delete(id: number): Promise<VacancyEntity> {
    const output = this.vacanciesRepository.delete(id);
    return output;
  }
  findOneById(id: number): Promise<VacancyEntity> {
    const output = this.vacanciesRepository.findOneById(id);
    return output;
  }
  findVacanciesByProjectId(projectId: number): Promise<VacancyEntity[]> {
    const output = this.vacanciesRepository.findVacanciesByProjectId(projectId);
    return output;
  }
}
