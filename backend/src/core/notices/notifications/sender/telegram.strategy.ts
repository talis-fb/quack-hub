import { Injectable } from "@nestjs/common";
import { Bot } from "grammy";
import { NotificationSenderStrategy } from "src/core/notices/notifications/sender.strategy";


@Injectable()
export class TelegramNotificationSender implements NotificationSenderStrategy {
    private botInstance: Bot
    constructor() {
        this.botInstance = new Bot("")
        this.botInstance.start()
    }

    async send(content: string, address: string[]): Promise<void> {
        await Promise.all(address.map(address => this.botInstance.api.sendMessage(address, content)))
    }
}