import { Controller, Get } from '@nestjs/common';
import { Public } from 'src/common/decorators/public.decorator';
import { AnnouncementService } from './announcement.service';

@Public()
@Controller('announcement')
export class AnnouncementController {
  constructor(private readonly announcementService: AnnouncementService) {}

  @Get()
  async getAnnouncement() {
    const output = await this.announcementService.getAnnouncement();

    return output;
  }
}
