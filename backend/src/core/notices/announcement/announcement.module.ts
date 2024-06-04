import { Module } from '@nestjs/common';
import { AnnouncementController } from './announcement.controller';
import { AnnouncementServiceProvider } from './announcement.service';
import { HttpModule } from '@nestjs/axios';
import { AnnouncementScrapingFacadeProvider } from './announcement.scraping.facade';

@Module({
  imports: [HttpModule],
  controllers: [AnnouncementController],
  providers: [AnnouncementServiceProvider, AnnouncementScrapingFacadeProvider],
})
export class AnnouncementModule {}
