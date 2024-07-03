import { Module } from '@nestjs/common';
import { AnnouncementController } from './announcement.controller';
import { AnnouncementServiceProvider } from './announcement.service';
import { HttpModule } from '@nestjs/axios';
import { AnnouncementScrapingFacade } from './announcement.scraping.facade';
import { ContextFactory } from 'src/factory/factories/context.factory';
import { FactoryModule } from 'src/factory/factory.module';

@Module({
  imports: [HttpModule, FactoryModule],
  controllers: [AnnouncementController],
  providers: [
    AnnouncementServiceProvider,
    {
      provide: AnnouncementScrapingFacade,
      useFactory: (contextFactory: ContextFactory) => {
        return contextFactory.createAnnouncementScrapingFacade();
      },
      inject: [ContextFactory],
    },
  ],
})
export class AnnouncementModule {}
