import { Module } from '@nestjs/common';
import { NotificationsServiceProvider } from './notifications.service';

@Module({
  providers: [NotificationsServiceProvider]
})
export class NotificationsModule {}
