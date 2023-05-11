import { Injectable } from '@nestjs/common';
import { InjectBot } from 'nestjs-telegraf';
import { Telegraf } from 'telegraf';

import { MessageDto } from '../messages/messages.model';
import { ALLOWED_USERS, TelegramContext } from './telegram.context';
import { Guest } from 'src/schemas/guest.schema';

@Injectable()
export class TelegramService {
  public constructor(@InjectBot() private bot: Telegraf<TelegramContext>) {}

  public async notifyIncomingMessage(message: MessageDto): Promise<void> {
    const telegramMessage = this.parseIncomingMessage(message);
    await this.sendMessage(telegramMessage);
  }

  public async notifyNewVisit(guest: Partial<Guest>): Promise<void> {
    const visitMessage = this.parseVisitMessage(guest);
    await this.sendMessage(visitMessage);
  }

  private async sendMessage(message: string): Promise<void> {
    const responses = ALLOWED_USERS.map((userId) => {
      return this.bot.telegram.sendMessage(userId, message, {
        parse_mode: 'HTML',
      });
    });

    await Promise.all(responses);
  }

  private parseIncomingMessage(message: MessageDto): string {
    const result = [
      `🙌 New message from <b>${message.name}</b>`,
      `📫 <code>${message.email}</code>`,
      '',
      `💬 ${message.text}`,
    ];

    return result.join('\n');
  }

  private parseVisitMessage(guest: Partial<Guest>): string {
    const { city, country, flag, userAgent } = guest;

    const browser = guest.browser ?? 'Unknown browser';
    const os = guest.os ?? 'Unknown OS';

    const result = [
      `👀 Someone from <b>${city}, ${country} ${flag}</b> visited website!`,
      `🖥 ${browser} : ${os}`,
      `⚡️ <code>${userAgent}</code>`,
    ];

    return result.join('\n');
  }
}
