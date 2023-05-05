import { Command, Ctx, Start, Update } from 'nestjs-telegraf';
import { TelegramContext } from './telegram.context';

@Update()
export class TelegramListener {
  @Start()
  public async handleStart(@Ctx() ctx: TelegramContext) {
    const {
      from: { first_name: username },
    } = ctx;

    await ctx.replyWithHTML(
      `You've been authenticated ✅ Welcome, <b>${username}</b>!`,
    );
  }

  @Command('whoami')
  public async handleCommandWhoami(@Ctx() ctx: TelegramContext) {
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
