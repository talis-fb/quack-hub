import { Module } from '@nestjs/common';
import { AnnouncementController } from './announcement.controller';
import { AnnouncementServiceProvider } from './announcement.service';
import { HttpModule } from '@nestjs/axios';
import { AnnouncementScrapingFacadeProviderIMD } from './providers/announcement.scraping.facade.imd';
import { AnnouncementScrapingFacadeProviderECT } from './providers/announcement.scraping.facade.ect';
import { AnnouncementScrapingFacadeProviderUSP } from './providers/announcement.scraping.facade.usp';

@Module({
  imports: [HttpModule],
  controllers: [AnnouncementController],
  providers: [
    AnnouncementServiceProvider,
    AnnouncementScrapingFacadeProviderIMD,
    //AnnouncementScrapingFacadeProviderECT,
    // AnnouncementScrapingFacadeProviderUSP,
  ],
})
export class AnnouncementModule {}
