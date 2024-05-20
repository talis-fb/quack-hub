import { Controller, Get, Query } from '@nestjs/common';
import { Public } from 'src/common/decorators/public.decorator';
import { AnnouncementService } from './announcement.service';
import { SearchAnnouncementQueryDto } from './dtos/SearchAnnouncementQueryDto';

@Public()
@Controller('announcement')
export class AnnouncementController {
  constructor(private readonly announcementService: AnnouncementService) {}

  @Get()
  async getAnnouncement(@Query() query: SearchAnnouncementQueryDto) {
    const { type, status } = query;
    const output = await this.announcementService.getAnnouncement(type, status);

    return output;
  }
}
