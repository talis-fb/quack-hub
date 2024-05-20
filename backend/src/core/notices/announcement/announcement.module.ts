import { Module } from '@nestjs/common';
import { AnnouncementController } from './announcement.controller';
import { AnnouncementServiceProvider } from './announcement.service';
import { HttpModule } from '@nestjs/axios';
import { AnnouncementRepositoryProvider } from './announcement.repository';

@Module({
  imports: [HttpModule],
  controllers: [AnnouncementController],
  providers: [AnnouncementServiceProvider, AnnouncementRepositoryProvider],
})
export class AnnouncementModule {}
