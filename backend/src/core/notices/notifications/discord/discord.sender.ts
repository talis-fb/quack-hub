import { HttpService } from "@nestjs/axios";
import { Injectable } from "@nestjs/common";
import { NotificationSenderStrategy } from "src/core/notices/notifications/abstracts/sender.strategy";

@Injectable()
export class DiscordNotificationSender implements NotificationSenderStrategy {
    constructor(private readonly httpService: HttpService) {}

    async send(content: string, address: string[]): Promise<void> {
        try {
            await Promise.allSettled(address.map(address => this.httpService.axiosRef.post(address, {
                    content,
                    embeds: null,
                    attachments: [],
                })
            ))
        } catch(err) {
            console.error(err)
        }
    }
}