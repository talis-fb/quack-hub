import { Injectable } from "@nestjs/common";
import { Bot } from "grammy";
import { NotificationSenderStrategy } from "src/core/notices/notifications/abstracts/sender.strategy";

@Injectable()
export class TelegramNotificationSender implements NotificationSenderStrategy {
    private botInstance: Bot
    constructor() {
        this.botInstance = new Bot(process.env.TELEGRAM_TOKEN_SENDER)
        this.botInstance.command("start", (ctx) => {
            const chatId = ctx.chat.id;
            ctx.reply("Welcome to QuackHub updateds! This is your chat id: " + chatId)
        })
        this.botInstance.start()
    }

    async send(content: string, address: string[]): Promise<void> {
        try {
            await Promise.allSettled(address.map(address => this.botInstance.api.sendMessage(address, content)))
        } catch(err) {
            console.error(err)
        }
    }
}