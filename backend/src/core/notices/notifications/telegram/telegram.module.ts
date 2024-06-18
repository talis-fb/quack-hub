import { Module } from '@nestjs/common';
import { NotificationsServiceProvider } from 'src/core/notices/notifications/notifications.service';
import { NotificationsRepositoryProvider } from 'src/core/notices/notifications/notifications.repository';
import { PrismaService } from 'src/common/prisma/prisma.service';
import { NotificationSenderStrategy } from '../abstracts/sender.strategy';
import { TelegramNotificationSender } from './telegram.sender';
import { TelegramNotificationController } from './telegram.controller';

@Module({
  controllers: [TelegramNotificationController],
  providers: [
    PrismaService,
    NotificationsRepositoryProvider,
    NotificationsServiceProvider, 
    {
      provide: NotificationSenderStrategy,
      useClass: TelegramNotificationSender,
    },
  ],
})
export class TelegramNotificationsModule {}
