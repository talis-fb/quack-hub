import { Module } from '@nestjs/common';
import { SeedMethodologiesService } from 'src/seeds/seed-methodologies.service';
import { PrismaService } from 'src/common/prisma/prisma.service';

@Module({
  providers: [PrismaService, SeedMethodologiesService],
})
export class SeedsModule {}
