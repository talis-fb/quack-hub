import { Module } from '@nestjs/common';
import { ExperienceController } from './experience.controller';
import { ExperienceService } from './experience.service';
import { ExperienceRepository } from './experience.repository';
import { PrismaService } from 'src/common/prisma/prisma.service';

@Module({
  controllers: [ExperienceController],
  providers: [
    ExperienceService,
    PrismaService,
    //ExperienceRepository,
  ]
})
export class ExperienceModule {}
