import { Command, Ctx, Hears, Start, Update } from 'nestjs-telegraf';

import { TelegramContext } from './telegram.context';
import { KeyboardStrategy } from './keyboard/telegram.keyboard';

@Update()
export class TelegramListener {
  constructor(private keyboardStrategy: KeyboardStrategy) {}

  @Start()
  @Command('menu')
  private async start(@Ctx() ctx: TelegramContext) {
    this.keyboardStrategy.render(ctx);
  }

  /**
   * There is no ability to add callback data for static keyboard
   * buttons in Telegraf, so clicking on keyboard button
   * conciders by Telegraf as plain message
   */
  @Hears(/\w/)
  private async onAnyMessage(@Ctx() ctx: TelegramContext) {
    const message: string = ctx.message['text'];

    const isMenuClick = await this.keyboardStrategy.handleMenuClick(
      message,
      ctx,
    );

    if (!isMenuClick) {
      await ctx.reply('⚠️ Unknown action ⚠️');
      return;
    }
  }
}
