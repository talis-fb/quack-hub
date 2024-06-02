import { ApiResponse, ApiTags } from "@nestjs/swagger";
import { NotificationService } from "src/core/notices/notifications/notifications.service";
import { Body, Controller, Get, Post, Query, Redirect, Req } from "@nestjs/common";


@ApiTags('notifications')
@Controller('notifications')
export class NotificationsController {
  constructor(
    private readonly notificationsService: NotificationService
  ) {}

  @ApiResponse({
    status: 201,
    description: 'The project has been successfully created',
  })
  @Post('telegram')
  async create(
    @Req() req,
    @Query('value') value: string,
  ): Promise<void> {
    const { userId } = req.user;
    await this.notificationsService.bindUserTo(userId, 'TELEGRAM', value);
  }

  @Get('telegram/bot')
  @Redirect("https://t.me/QuackHubBot")
  async getTelegramBot() {}

  @ApiResponse({
    status: 201,
    description: 'The project has been successfully created',
  })
  @Post('telegram/send')
  async send(
    @Req() req,
    @Query('content') content: string,
  ): Promise<void> {
    const { userId } = req.user;
    await this.notificationsService.sendNotification(content, [userId]);
  }
}