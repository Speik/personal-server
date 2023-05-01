import { Injectable } from '@nestjs/common';
import { InjectBot } from 'nestjs-telegraf';
import { Telegraf } from 'telegraf';

import { MessageDto } from '../messages/messages.model';
import { ALLOWED_USERS, TelegramContext } from './telegram.context';

@Injectable()
export class TelegramService {
  public constructor(@InjectBot() private bot: Telegraf<TelegramContext>) {}

  public async notifyIncomingMessage(message: MessageDto): Promise<void> {
    const telegramMessage = this.parseIncomingMessage(message);

    const responses = ALLOWED_USERS.map((userId) => {
      return this.bot.telegram.sendMessage(userId, telegramMessage, {
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
}
