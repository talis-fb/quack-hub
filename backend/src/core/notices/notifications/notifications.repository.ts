import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/common/prisma/prisma.service';
import { INotificationsBindType, NotificationsBind, NotificationsBindEntity } from './notifications.entity';

export abstract class NotificationsRepository {
  abstract create(data: NotificationsBind): Promise<NotificationsBindEntity>;
  abstract update_value(id: number,value: string): Promise<NotificationsBindEntity>;
  abstract delete(id: number[]): Promise<void>;
  abstract findBindValueOfUsers(ids: number[], type: INotificationsBindType[]): Promise<string[]>;
}

@Injectable()
export class NotificationsRepositoryImpl implements NotificationsRepository {
  constructor(private prisma: PrismaService) {}

  async create(data: NotificationsBind): Promise<NotificationsBindEntity> {
    const output = await this.prisma.notificationBind.create({
      data,
    });
    return output;
  }

  async update_value(id: number, value: string): Promise<NotificationsBindEntity> {
    const output = await this.prisma.notificationBind.update({
      where: {
        id,
      },
      data: {
        value
      }
    });
    return output;
  }

  async delete(id: number[]): Promise<void> {
    await this.prisma.notificationBind.deleteMany({
      where: {
        id: {
          in: id
        }
      }
    })
  }

  async findBindValueOfUsers(ids: number[], type: INotificationsBindType[]): Promise<string[]> {
    const output = await this.prisma.notificationBind.findMany({
      select: {
        value: true
      },
      where: {
        userId: {
          in: ids,
        },
        type: {
          in: type,
        },
      },
    });
    return output.map((item) => item.value);
  }  
}
