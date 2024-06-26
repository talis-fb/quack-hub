import { Module } from '@nestjs/common';
import { ExperienceController } from 'src/core/profile/experience/experience.controller';
import {
  ExperienceService,
  ExperienceServiceImpl,
} from 'src/core/profile/experience/experience.service';
import {
  ExperienceRepository,
  ExperienceRepositoryImpl,
} from './experience.repository';
import { PrismaService } from 'src/common/prisma/prisma.service';
import { UserModule } from 'src/core/profile/user/user.module';
import { UserRepositoryProvider } from '../user/user.repository';

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
    UserRepositoryProvider
  ],
  controllers: [ExperienceController],
})
export class ExperienceModule {}
