import { Markup } from 'telegraf';
import { Injectable, Logger } from '@nestjs/common';

import { TelegramContext } from '../telegram.context';
import { KeyboardButton, KeyboardLayout, KeyboardName } from './declarations';

@Injectable()
class KeyboardStrategy {
  private keyboards: KeyboardLayout[] = [];

  public constructor(private logger: Logger) {
    this.registerKeyboards();
  }

  public async handleMenuClick(
    message: string,
    ctx: TelegramContext,
  ): Promise<boolean> {
    const targetKeyboard = this.getKeyboardByButtonLabel(message);
    if (!targetKeyboard) return false;

    const clickedButton = this.getButtonByLabel(targetKeyboard, message);
    const { redirect: redirectPath, callback } = clickedButton;
    if (!clickedButton) return false;

    if (redirectPath) this.renderKeyboard(redirectPath, ctx);
    if (callback) callback.call(null, ctx);

    return true;
  }

  public async render(ctx: TelegramContext): Promise<void> {
    this.renderKeyboard('default', ctx);
  }

  private async renderKeyboard(
    keyboardName: KeyboardName,
    ctx: TelegramContext,
  ): Promise<void> {
    const targetKeyboard = this.getKeyboardByName(keyboardName);

    const labels = this.parseLabels(targetKeyboard);
    const result = Markup.keyboard(labels);

    ctx.replyWithHTML(targetKeyboard.message, result);
  }

  private async registerKeyboards(): Promise<void> {
    const layouts = await import('./layouts');

    Object.values(layouts).forEach((layout) => {
      this.keyboards.push(layout);

      this.logger.log(
        `Registered Telegram keyboard layout - '${layout.name}'`,
        'Telegram',
      );
    });
  }

  private parseLabels(keyboard: KeyboardLayout): string[][] {
    return keyboard.rows.map((row) => row.map(({ label }) => label));
  }

  private getButtonByLabel(
    keyboard: KeyboardLayout,
    message: string,
  ): Optional<KeyboardButton> {
    return keyboard.rows.flat().find((button) => button.label === message);
  }

  private getKeyboardByButtonLabel(message: string): Optional<KeyboardLayout> {
    return this.keyboards.find((keyboard) =>
      Boolean(this.getButtonByLabel(keyboard, message)),
    );
  }

  private getKeyboardByName(
    keyboardName: KeyboardName,
  ): Optional<KeyboardLayout> {
    return this.keyboards.find((keyboard) => keyboard.name === keyboardName);
  }
}

export { KeyboardStrategy };
