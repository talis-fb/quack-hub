import { Module } from '@nestjs/common';
import { VacanciesService, VacanciesServiceImpl } from './vacancies.service';
import { VacanciesController } from './vacancies.controller';
import {
  VacanciesRepository,
  VacanciesRepositoryImpl,
} from './vacancies.repository';
import { PrismaService } from 'src/common/prisma/prisma.service';

@Module({
  providers: [
    PrismaService,
    VacanciesController,
    {
      provide: VacanciesRepository,
      useClass: VacanciesRepositoryImpl,
    },
    {
      provide: VacanciesService,
      useClass: VacanciesServiceImpl,
    },
  ],
  controllers: [VacanciesController],
})
export class VacanciesModule {}
