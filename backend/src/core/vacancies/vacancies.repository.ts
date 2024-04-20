import { Injectable } from '@nestjs/common';
import { VacancyData, VacancyEntity } from './vacancies.entity';
import { PrismaService } from 'src/common/prisma/prisma.service';

export abstract class VacanciesRepository {
  abstract create(data: VacancyData): Promise<VacancyEntity>;
  abstract update(
    id: number,
    data: Partial<VacancyData>,
  ): Promise<VacancyEntity>;
  abstract delete(id: number): Promise<VacancyEntity>;
  abstract findOneById(id: number): Promise<VacancyEntity>;
  abstract findVacanciesByProjectId(
    projectId: number,
  ): Promise<VacancyEntity[]>;
}

@Injectable()
export class VacanciesRepositoryImpl implements VacanciesRepository {
  constructor(private prisma: PrismaService) {}

  async create(data: VacancyData): Promise<VacancyEntity> {
    const output = await this.prisma.vacancy.create({
      data,
    });
    return output;
  }
  async update(id: number, data: Partial<VacancyData>): Promise<VacancyEntity> {
    console.log({ data });

    const output = await this.prisma.vacancy.update({
      where: {
        id,
      },
      data,
    });

    return output;
  }
  async delete(id: number): Promise<VacancyEntity> {
    const output = await this.prisma.vacancy.delete({
      where: {
        id,
      },
    });

    return output;
  }
  async findOneById(id: number): Promise<VacancyEntity> {
    const output = await this.prisma.vacancy.findUnique({
      where: {
        id,
      },
    });

    return output;
  }
  async findVacanciesByProjectId(projectId: number): Promise<VacancyEntity[]> {
    const output = await this.prisma.vacancy.findMany({
      where: {
        projectId,
      },
    });

    return output;
  }
}
