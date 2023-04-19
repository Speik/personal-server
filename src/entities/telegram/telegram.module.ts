import { Logger, Module } from '@nestjs/common';
import { TelegrafModule } from 'nestjs-telegraf';
import { ConfigModule, ConfigService } from '@nestjs/config';

import { TelegramListener } from './telegram.listener';
import { KeyboardStrategy } from './keyboard/telegram.keyboard';

@Module({
  providers: [TelegramListener, KeyboardStrategy, Logger],
  imports: [
    TelegrafModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        token: configService.get<string>('TELEGRAM_TOKEN'),
      }),
    }),
  ],
})
export class TelegramModule {}
