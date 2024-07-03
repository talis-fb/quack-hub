import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { AnnouncementScrapingFacade } from 'src/core/notices/announcement/announcement.scraping.facade';
import { NewsScrapingFacade } from 'src/core/notices/news/news.scraping.facade';
import { SuggestProjects } from 'src/core/projects/project/suggest-projects';
import { AnnouncementScrapingFacadeECT } from 'src/core/notices/announcement/providers/announcement.scraping.facade.ect';
import { AlgoritmSuggestProjectsECT } from 'src/core/projects/project/suggest-providers/suggest-projects-ect';
import { NewsScrapingFacadeECT } from 'src/core/notices/news/providers/news.scraping.facade.ect';
import { ContextFactory } from 'src/factory/factories/context.factory';

@Injectable()
export class ECTFactory implements ContextFactory {
  constructor(private readonly httpService: HttpService) {}
  createAnnouncementScrapingFacade(): AnnouncementScrapingFacade {
    return new AnnouncementScrapingFacadeECT(this.httpService);
  }
  createSuggestProjects(): SuggestProjects {
    return new AlgoritmSuggestProjectsECT();
  }
  createNewsScrapingFacade(): NewsScrapingFacade {
    return new NewsScrapingFacadeECT(this.httpService);
  }
}
