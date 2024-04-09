import { Module } from '@nestjs/common';
import { PrismaService } from '../../common/prisma/prisma.service';
import { ProjectsController } from './projects.controller';
import { ProjectsService, ProjectsServiceImpl } from './projects.service';
import {
  ProjectsRepository,
  ProjectsRepositoryImpl,
} from './project.repository';
import { UserModule } from '../user/user.module';

@Module({
  imports: [UserModule],
  controllers: [ProjectsController],
  providers: [
    PrismaService,
    {
      provide: ProjectsService,
      useClass: ProjectsServiceImpl,
    },
    { provide: ProjectsRepository, useClass: ProjectsRepositoryImpl },
  ],
})
export class ProjectsModule {}
