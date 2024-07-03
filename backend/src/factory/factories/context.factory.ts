import { AnnouncementScrapingFacade } from 'src/core/notices/announcement/announcement.scraping.facade';
import { NewsScrapingFacade } from 'src/core/notices/news/news.scraping.facade';
import { SuggestProjects } from 'src/core/projects/project/suggest-projects';

export abstract class ContextFactory {
  abstract createAnnouncementScrapingFacade(): AnnouncementScrapingFacade;
  abstract createSuggestProjects(): SuggestProjects;
  abstract createNewsScrapingFacade(): NewsScrapingFacade;
}
