import { ApiTags } from "@nestjs/swagger";
import { NotificationService } from "src/core/notices/notifications/notifications.service";
import { Controller, Get, Post, Query, Redirect, Req } from "@nestjs/common";

export abstract class AbstractNotificationsController {
  constructor(private notificationsService: NotificationService) {}

  @Post('bind')
  async create(
    @Req() req,
    @Query('address') address: string,
  ): Promise<void> {
    const { userId } = req.user;
    await this.notificationsService.bindUserTo(userId, 'TELEGRAM', address);
  }

  @Post('send')
  async send(
    @Req() req,
    @Query('content') content: string,
  ): Promise<void> {
    const { userId } = req.user;
    await this.notificationsService.sendNotification(content, [userId]);
  }
}