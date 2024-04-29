import { Module } from '@nestjs/common';
import { PrismaService } from 'src/common/prisma/prisma.service';
import { ProjectsController } from './project.controller';
import { ProjectsService, ProjectsServiceImpl } from './project.service';
import {
  ProjectsRepository,
  ProjectsRepositoryImpl,
} from './project.repository';
import { UserModule } from 'src/core/profile/user/user.module';
import { UserRepositoryProvider } from 'src/core/profile/user/user.repository';

@Module({
  controllers: [ProjectsController],
  providers: [
    PrismaService,
    UserRepositoryProvider,
    {
      provide: ProjectsService,
      useClass: ProjectsServiceImpl,
    },
    { provide: ProjectsRepository, useClass: ProjectsRepositoryImpl },
  ],
})
export class ProjectModule {}
