import { Module } from '@nestjs/common';
import { NotificationsServiceProvider } from 'src/core/notices/notifications/notifications.service';
import { NotificationsRepositoryProvider } from 'src/core/notices/notifications/notifications.repository';
import { PrismaService } from 'src/common/prisma/prisma.service';
import { EmailNotificationController } from 'src/core/notices/notifications/email/email.controller';
import { EmailsNotificationSender } from 'src/core/notices/notifications/email/email.sender';
import { NotificationSenderStrategy } from '../abstracts/sender.strategy';

@Module({
  controllers: [EmailNotificationController],
  providers: [
    PrismaService,
    NotificationsRepositoryProvider,
    NotificationsServiceProvider, 
    {
      provide: NotificationSenderStrategy,
      useClass: EmailsNotificationSender,
    },
  ],
})
export class EmailNotificationsModule {}
