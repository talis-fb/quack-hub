import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { AnnouncementScrapingFacade } from 'src/core/notices/announcement/announcement.scraping.facade';
import { AnnouncementScrapingFacadeIMD } from 'src/core/notices/announcement/providers/announcement.scraping.facade.imd';
import { NewsScrapingFacade } from 'src/core/notices/news/news.scraping.facade';
import { NewsScrapingFacadeIMD } from 'src/core/notices/news/providers/news.scraping.facade.imd';
import { SuggestProjects } from 'src/core/projects/project/suggest-projects';
import { AlgoritmSuggestProjectsIMD } from 'src/core/projects/project/suggest-providers/suggest-projects-imd';
import { ContextFactory } from 'src/factory/factories/context.factory';

@Injectable()
export class IMDFactory implements ContextFactory {
  constructor(private readonly httpService: HttpService) {}

  createAnnouncementScrapingFacade(): AnnouncementScrapingFacade {
    return new AnnouncementScrapingFacadeIMD(this.httpService);
  }
  createSuggestProjects(): SuggestProjects {
    return new AlgoritmSuggestProjectsIMD();
  }
  createNewsScrapingFacade(): NewsScrapingFacade {
    return new NewsScrapingFacadeIMD(this.httpService);
  }
}
