import { Markup } from 'telegraf';
import { Injectable, Logger } from '@nestjs/common';

import { KeyboardButton, KeyboardLayout, KeyboardName } from './declarations';

import { TelegramContext } from '../telegram.context';
import { TelegramHandler } from '../telegram.handler';

@Injectable()
export class TelegramKeyboardStrategy {
  private staticKeyboards: KeyboardLayout[] = [];

  public constructor(private handler: TelegramHandler, private logger: Logger) {
    this.registerStaticKeyboards(handler);
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
    if (callback) callback.call(this.handler, ctx);

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
    return this.staticKeyboards.find((keyboard) =>
      Boolean(this.getButtonByLabel(keyboard, message)),
    );
  }

  private getKeyboardByName(
    keyboardName: KeyboardName,
  ): Optional<KeyboardLayout> {
    return this.staticKeyboards.find(
      (keyboard) => keyboard.name === keyboardName,
    );
  }

  private async registerStaticKeyboards(
    handler: TelegramHandler,
  ): Promise<void> {
    const staticKeyboards = await import('./layouts');

    Object.values(staticKeyboards).forEach((keyboardConstructor) => {
      const keyboard: KeyboardLayout = keyboardConstructor(handler);

      this.staticKeyboards.push(keyboard);
      this.logger.log(
        `Registered static keyboard '${keyboard.name}'`,
        'Telegram',
      );
    });
  }
}
