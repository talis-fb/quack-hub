import { Injectable } from "@nestjs/common";
import { NotificationSenderStrategy } from "src/core/notices/notifications/abstracts/sender.strategy";
import * as NodeMailer from "nodemailer";


@Injectable()
export class EmailsNotificationSender implements NotificationSenderStrategy {
  private transporter: NodeMailer.Transporter;
    constructor() {
        this.transporter = NodeMailer.createTransport({
          host: process.env.EMAIL_SENDER_HOST,
          port: 2525,
          auth: {
            user: process.env.EMAIL_SENDER_AUTH_USER,
            pass: process.env.EMAIL_SENDER_AUTH_PASS,
          }
        });
    }

    async send(content: string, address: string[]): Promise<void> {
      try {
        await Promise.allSettled(address.map(address => this.transporter.sendMail({
          from: process.env.EMAIL_SENDER_FROM_ADDRESS,
          to: address,
          subject: "QuackHub",
          text: content
        })))
      } catch(err) {
          console.error(err)
      }
    }
}