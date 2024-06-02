import { Inject, Injectable, Provider } from '@nestjs/common';
import { INotificationsBindType, NotificationsBind, NotificationsBindEntity } from './notifications.entity';
import { NotificationsRepository } from 'src/core/notices/notifications/notifications.repository';
import { NotificationSenderStrategy } from 'src/core/notices/notifications/sender.strategy';

export abstract class NotificationService {
  abstract sendNotification(content: string, userIds: number[]): Promise<void>;
  abstract bindUserTo(userId: number, typeBind: INotificationsBindType, value: string): Promise<NotificationsBindEntity>
}

@Injectable()
export class NotificationServiceImpl implements NotificationService {
  constructor(
    @Inject('TELEGRAM_SENDER')
    private telegramSender: NotificationSenderStrategy,
    private repository: NotificationsRepository,
  ) {}
  async sendNotification(content: string, userIds: number[]): Promise<void> {
    const addresses = await this.repository.findBindValueOfUsers(userIds, ['TELEGRAM']);
    this.telegramSender.send(content, addresses);
  }

  async bindUserTo(userId: number, type: INotificationsBindType, value: string): Promise<NotificationsBindEntity> {
    return await this.repository.create({
      userId,
      type,
      value,
    });
  }
}

export const NotificationsServiceProvider: Provider = {
  provide: NotificationService,
  useClass: NotificationServiceImpl,
};
