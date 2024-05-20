import { Module } from '@nestjs/common';
import { MethodologiesServiceProvider } from 'src/core/methodologies/methodologies.service';
import { MethodologiesRepositoryProvider } from 'src/core/methodologies/methodologies.repository';
import { MethodologieStartup } from 'src/core/methodologies/methodologies.startup';
import { PrismaService } from 'src/common/prisma/prisma.service';
import { MethodologiesController } from './methodologies.controller';

@Module({
  providers: [
    PrismaService, 
    MethodologieStartup,
    MethodologiesServiceProvider, 
    MethodologiesRepositoryProvider, 
  ],
  controllers: [MethodologiesController],
})
export class MethodologiesModule {}
