import { Logger, Module } from '@nestjs/common';
import { TelegrafModule } from 'nestjs-telegraf';
import { ConfigModule, ConfigService } from '@nestjs/config';

import { SkillsModule } from '../skills/skills.module';

import { TelegramHandler } from './telegram.handler';
import { TelegramKeyboardStrategy } from './keyboard/telegram.keyboard';
import { TelegramListener } from './telegram.listener';

@Module({
  providers: [
    TelegramListener,
    TelegramHandler,
    TelegramKeyboardStrategy,
    Logger,
  ],
  imports: [
    SkillsModule,
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
