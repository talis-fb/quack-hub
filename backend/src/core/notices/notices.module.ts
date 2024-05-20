import { Module } from '@nestjs/common';
import { AnnouncementModule } from 'src/core/notices/announcement/announcement.module';
import { NewsModule } from 'src/core/notices/news/news.module';

@Module({
  imports: [AnnouncementModule, NewsModule],
})
export class NoticesModule {}
