export class NotificationsBind {
    userId: number
    type: INotificationsBindType
    value: string
}

export class NotificationsBindEntity extends NotificationsBind {
    id: number
}

export const NotificationsBindType = [
    'TELEGRAM',
    'EMAIL',
    "DISCORD",
] as const;

export type INotificationsBindType = typeof NotificationsBindType[number];
