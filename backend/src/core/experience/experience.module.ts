import { Module } from '@nestjs/common';
import { ExperienceController } from './experience.controller';
import { ExperienceService, ExperienceServiceImpl } from './experience.service';
import {
  ExperienceRepository,
  ExperienceRepositoryImpl,
} from './experience.repository';
import { PrismaService } from 'src/common/prisma/prisma.service';

@Module({
  controllers: [ExperienceController],
  providers: [
    PrismaService,
    {
      provide: ExperienceService,
      useClass: ExperienceServiceImpl,
    },
    {
      provide: ExperienceRepository,
      useClass: ExperienceRepositoryImpl,
    },
  ],
})
export class ExperienceModule {}
