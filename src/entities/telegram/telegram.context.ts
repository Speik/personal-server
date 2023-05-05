import { ContextType } from '@nestjs/common';
import { Scenes } from 'telegraf';

export const ALLOWED_USERS = [1253711295];
export const TELEGRAM_CONTEXT_TYPE = <ContextType>'telegraf';
export type TelegramContext = Scenes.SceneContext;
