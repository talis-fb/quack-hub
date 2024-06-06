import { ApiTags } from "@nestjs/swagger";
import { Controller, Get, Redirect } from "@nestjs/common";
import { AbstractNotificationsController } from "../abstracts/notifications.controller";

@ApiTags('notifications/telegram')
@Controller('notifications/telegram')
export class TelegramNotificationController extends AbstractNotificationsController {
    @Get('bot')
    @Redirect("https://t.me/QuackHubBot")
    async getTelegramBot() {}
}

