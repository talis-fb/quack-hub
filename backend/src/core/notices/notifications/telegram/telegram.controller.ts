import { ApiTags } from "@nestjs/swagger";
import { Controller, Get, Redirect } from "@nestjs/common";
import { AbstractNotificationsController } from "../abstracts/notifications.controller";
import { INotificationsBindType } from "../notifications.entity";
import { NotificationService } from "../notifications.service";

@ApiTags('notifications/telegram')
@Controller('notifications/telegram')
export class TelegramNotificationController extends AbstractNotificationsController {
    constructor(private notificationsService: NotificationService) {
        super(notificationsService)
    }

    bindType: INotificationsBindType = "TELEGRAM";

    @Get('bot')
    @Redirect("https://t.me/QuackHubBot")
    async getTelegramBot() {}
}

