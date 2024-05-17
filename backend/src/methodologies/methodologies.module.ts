import { Module } from '@nestjs/common';
import { MethodologiesServiceProvider } from 'src/methodologies/methodologies.service';
import { MethodologiesRepositoryProvider } from 'src/methodologies/methodologies.repository';
import { PrismaService } from 'src/common/prisma/prisma.service';
import { MethodologiesController } from './methodologies.controller';

@Module({
  providers: [PrismaService, MethodologiesServiceProvider, MethodologiesRepositoryProvider],
  controllers: [MethodologiesController],
})
export class MethodologiesModule {}
