import { ApiTags } from "@nestjs/swagger";
import { NotificationService } from "src/core/notices/notifications/notifications.service";
import { Controller, Get, Post, Query, Redirect, Req } from "@nestjs/common";
import { INotificationsBindType } from "../notifications.entity";

export abstract class AbstractNotificationsController {
  constructor(private _notificationsService: NotificationService) {}

  abstract bindType: INotificationsBindType

  @Post('bind')
  async create(
    @Req() req,
    @Query('address') address: string,
  ): Promise<void> {
    const { userId } = req.user;
    await this._notificationsService.bindUserTo(userId, this.bindType, address);
  }

  @Post('send')
  async send(
    @Req() req,
    @Query('content') content: string,
  ): Promise<void> {
    const { userId } = req.user;
    await this._notificationsService.sendNotification(content, [userId], [this.bindType]);
  }
}