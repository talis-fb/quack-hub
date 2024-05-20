import { Controller, Get } from '@nestjs/common';
import { Public } from 'src/common/decorators/public.decorator';
import { NewsService } from 'src/core/notices/news/news.service';

@Public()
@Controller('news')
export class NewsController {
  constructor(private readonly newsService: NewsService) {}

  @Get()
  async getNews() {
    const output = await this.newsService.getNews();

    return output;
  }
}
