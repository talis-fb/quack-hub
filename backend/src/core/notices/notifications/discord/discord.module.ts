import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import { NotificationsServiceProvider } from 'src/core/notices/notifications/notifications.service';
import { NotificationsRepositoryProvider } from 'src/core/notices/notifications/notifications.repository';
import { PrismaService } from 'src/common/prisma/prisma.service';
import { NotificationSenderStrategy } from '../abstracts/sender.strategy';
import { DiscordNotificationSender } from './discord.sender';
import { DiscordNotificationController } from './discord.controller';

@Module({
  imports: [HttpModule],
  controllers: [DiscordNotificationController],
  providers: [
    PrismaService,
    NotificationsRepositoryProvider,
    NotificationsServiceProvider, 
    {
      provide: NotificationSenderStrategy,
      useClass: DiscordNotificationSender,
    },
  ],
})
export class DiscordNotificationsModule {}
