import { Command, Ctx, Start, Update } from 'nestjs-telegraf';

import { TelegramContext } from './telegram.context';
import { TelegramService } from './telegram.service';

@Update()
export class TelegramListener {
  public constructor(private telegramService: TelegramService) {}

  @Start()
  private async start(@Ctx() ctx: TelegramContext) {
    const {
      from: { first_name: username },
    } = ctx;

    await ctx.replyWithHTML(
      `You've been authenticated ✅ Welcome, <b>${username}</b>!`,
    );
  }

  @Command('whoami')
  private async onCommandWhoami(@Ctx() ctx: TelegramContext) {
    const {
      from: { first_name: name, username, id, language_code: languageCode },
    } = ctx;

    const lines: string[] = [
      `<b>${name}</b>`,
      ``,
      `<b>ID</b> - <code>${id}</code>`,
      `<b>Username</b> - ${username}`,
      `<b>Language</b> - ${languageCode}`,
    ];

    await ctx.replyWithHTML(lines.join('\n'));
  }
}
