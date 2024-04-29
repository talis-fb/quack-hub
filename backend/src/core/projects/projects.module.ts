import { Module } from '@nestjs/common';
import { ProjectModule } from 'src/core/projects/project/project.module';
import { VacanciesModule } from 'src/core/projects/vacancies/vacancies.module';

@Module({
  imports: [ProjectModule, VacanciesModule],
})
export class ProjectsModule {}
