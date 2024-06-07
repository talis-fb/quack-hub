import { Module } from '@nestjs/common';
import { AnnouncementController } from './announcement.controller';
import { AnnouncementServiceProvider } from './announcement.service';
import { HttpModule } from '@nestjs/axios';
import { AnnouncementScrapingFacadeProviderIMD } from './providers/announcement.scraping.facade.imd';
import { AnnouncementScrapingFacadeProviderECT } from './providers/announcement.scraping.facade.ect';

@Module({
  imports: [HttpModule],
  controllers: [AnnouncementController],
  providers: [
    AnnouncementServiceProvider,
    //AnnouncementScrapingFacadeProviderIMD,
    AnnouncementScrapingFacadeProviderECT,
  ],
})
export class AnnouncementModule {}
