export abstract class NotificationSenderStrategy {
  abstract send(content: string, address: string[]): Promise<void>;
}

