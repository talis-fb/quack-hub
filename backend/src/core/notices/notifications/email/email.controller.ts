import { ApiTags } from "@nestjs/swagger";
import { Controller } from "@nestjs/common";
import { AbstractNotificationsController } from "../abstracts/notifications.controller";
import { NotificationService } from "../notifications.service";

@ApiTags('notifications/emails')
@Controller('notifications/emails')
export class EmailNotificationController extends AbstractNotificationsController {
}
