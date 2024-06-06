import { Module } from '@nestjs/common';
import { EmailNotificationsModule } from './email/email.module';
import { TelegramNotificationsModule } from './telegram/telegram.module';

@Module({
  imports: [EmailNotificationsModule, TelegramNotificationsModule]
})
export class NotificationsModule {}
