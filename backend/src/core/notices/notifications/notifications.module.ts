import { Module } from '@nestjs/common';
import { EmailNotificationsModule } from './email/email.module';
import { TelegramNotificationsModule } from './telegram/telegram.module';
import { DiscordNotificationsModule } from './discord/discord.module';

@Module({
  imports: [
    TelegramNotificationsModule,
    DiscordNotificationsModule,
    // EmailNotificationsModule, 
  ]
})
export class NotificationsModule {}
