import { Module } from '@nestjs/common';
import { NotificationsServiceProvider } from './notifications.service';
import { NotificationsRepositoryProvider } from './notifications.repository';
import { TelegramNotificationSender } from './sender/telegram.strategy';
import { PrismaService } from 'src/common/prisma/prisma.service';
import { NotificationsController } from './notifications.controller';

@Module({
  controllers: [NotificationsController],
  providers: [
    PrismaService,
    NotificationsRepositoryProvider,
    NotificationsServiceProvider, 
    {
      provide: "TELEGRAM_SENDER",
      useClass: TelegramNotificationSender,
    }
  ],
})
export class NotificationsModule {}
