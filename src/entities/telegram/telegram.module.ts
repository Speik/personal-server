import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TelegrafModule } from 'nestjs-telegraf';

import { TelegramListener } from './telegram.listener';
import { TelegramService } from './telegram.service';
import { ALLOWED_USERS, TelegramContext } from './telegram.context';

const Authentication = (ctx: TelegramContext, next) => {
  if (!ctx.message) return next();
  // Only allow user to get information himself
  if (ctx.message['text'] === '/whoami') return next();

  return ALLOWED_USERS.includes(ctx.message.chat.id)
    ? next()
    : ctx.replyWithHTML('<b>💥 Authentication failed 💥</b>');
};

@Module({
  providers: [TelegramListener, TelegramService],
  imports: [
    TelegrafModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        token: configService.get<string>('TELEGRAM_TOKEN'),
        middlewares: [Authentication],
      }),
    }),
  ],
})
export class TelegramModule {}
