import { Module } from '@nestjs/common';
import { ExperienceController } from './experience.controller';
import { ExperienceService, ExperienceServiceImpl } from './experience.service';
import {
  ExperienceRepository,
  ExperienceRepositoryImpl,
} from './experience.repository';
import { PrismaService } from 'src/common/prisma/prisma.service';
import { UserModule } from '../user/user.module';

@Module({
  imports: [UserModule],
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
  controllers: [ExperienceController],
})
export class ExperienceModule {}
