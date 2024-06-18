import { ApiTags } from "@nestjs/swagger";
import { Controller } from "@nestjs/common";
import { AbstractNotificationsController } from "../abstracts/notifications.controller";
import { NotificationService } from "../notifications.service";
import { INotificationsBindType } from "../notifications.entity";

@ApiTags('notifications/emails')
@Controller('notifications/emails')
export class EmailNotificationController extends AbstractNotificationsController {
    constructor(private notificationsService: NotificationService) {
        super(notificationsService)
    }

    bindType: INotificationsBindType = "EMAIL";
}
