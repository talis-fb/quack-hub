import { Module } from '@nestjs/common';
import { AnnouncementModule } from 'src/core/notices/announcement/announcement.module';
import { NewsModule } from 'src/core/notices/news/news.module';
import { NotificationsModule } from './notifications/notifications.module';

@Module({
  imports: [AnnouncementModule, NewsModule, NotificationsModule],
})
export class NoticesModule {}
