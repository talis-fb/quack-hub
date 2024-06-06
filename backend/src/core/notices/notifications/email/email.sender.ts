import { Injectable } from "@nestjs/common";
import { NotificationSenderStrategy } from "src/core/notices/notifications/abstracts/sender.strategy";
import * as NodeMailer from "nodemailer";


@Injectable()
export class EmailsNotificationSender implements NotificationSenderStrategy {
  private transporter: NodeMailer.Transporter;
    constructor() {
        this.transporter = NodeMailer.createTransport({
          host: "sandbox.smtp.mailtrap.io",
          port: 2525,
          auth: {
            user: "e1923de19edcad",
            pass: "0e72f11dbcf625"
          }
        });
    }

    async send(content: string, address: string[]): Promise<void> {
      try {

        console.log("CHAMOUUUU")

        await Promise.allSettled(address.map(address => this.transporter.sendMail({
          from: "quackhub@email.com",
          to: address,
          subject: "QuackHub",
          text: content
        })))
      } catch(err) {
          console.error(err)
      }
    }
}