import { ApiTags } from "@nestjs/swagger";
import { Controller, Get, Redirect } from "@nestjs/common";
import { AbstractNotificationsController } from "../abstracts/notifications.controller";
import { INotificationsBindType } from "../notifications.entity";
import { NotificationService } from "../notifications.service";

@ApiTags('notifications/discord')
@Controller('notifications/discord')
export class DiscordNotificationController extends AbstractNotificationsController {
    constructor(private notificationsService: NotificationService) {
        super(notificationsService)
    }

    bindType: INotificationsBindType = "DISCORD";
}

