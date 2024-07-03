import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { AnnouncementScrapingFacade } from 'src/core/notices/announcement/announcement.scraping.facade';
import { AnnouncementScrapingFacadeUSP } from 'src/core/notices/announcement/providers/announcement.scraping.facade.usp';
import { NewsScrapingFacade } from 'src/core/notices/news/news.scraping.facade';
import { NewsScrapingFacadeUSP } from 'src/core/notices/news/providers/news.scraping.facade.usp';
import { SuggestProjects } from 'src/core/projects/project/suggest-projects';
import { AlgoritmSuggestProjectsUSP } from 'src/core/projects/project/suggest-providers/suggest-projects-usp';
import { ContextFactory } from 'src/factory/factories/context.factory';

@Injectable()
export class USPFactory implements ContextFactory {
  constructor(private readonly httpService: HttpService) {}
  createAnnouncementScrapingFacade(): AnnouncementScrapingFacade {
    return new AnnouncementScrapingFacadeUSP(this.httpService);
  }
  createSuggestProjects(): SuggestProjects {
    return new AlgoritmSuggestProjectsUSP();
  }
  createNewsScrapingFacade(): NewsScrapingFacade {
    return new NewsScrapingFacadeUSP(this.httpService);
  }
}
