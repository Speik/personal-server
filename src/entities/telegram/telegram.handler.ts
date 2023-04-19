import { TelegramContext } from './telegram.context';

export class TelegramHandler {
  public static async showSocial(ctx: TelegramContext): Promise<void> {
    await ctx.reply("It's your social links");
  }

  public static async showInbox(ctx: TelegramContext): Promise<void> {
    await ctx.reply("It's your inbox");
  }

  public static async showResume(ctx: TelegramContext): Promise<void> {
    await ctx.reply("It's your CV");
  }
}
