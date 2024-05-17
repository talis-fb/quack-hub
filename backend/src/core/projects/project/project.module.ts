import { Module } from '@nestjs/common';
import { PrismaService } from 'src/common/prisma/prisma.service';
import { ProjectsController } from 'src/core/projects/project/project.controller';
import {
  ProjectsService,
  ProjectsServiceImpl,
} from 'src/core/projects/project/project.service';
import {
  ProjectsRepository,
  ProjectsRepositoryImpl,
} from './project.repository';
import { HttpModule } from '@nestjs/axios';
import { UserRepositoryProvider } from 'src/core/profile/user/user.repository';
import { ProjectImpoterProvider } from 'src/core/projects/project/project-importer';

@Module({
  imports: [HttpModule],
  controllers: [ProjectsController],
  providers: [
    PrismaService,
    ProjectImpoterProvider,
    UserRepositoryProvider,
    {
      provide: ProjectsService,
      useClass: ProjectsServiceImpl,
    },
    { provide: ProjectsRepository, useClass: ProjectsRepositoryImpl },
  ],
})
export class ProjectModule {}
