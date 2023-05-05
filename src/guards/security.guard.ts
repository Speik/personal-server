import { ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';

import { PUBLIC_KEY } from 'src/decorators/pulic.decorator';
import { TELEGRAM_CONTEXT_TYPE } from 'src/entities/telegram/telegram.context';

export abstract class SecurityGuard {
  protected isRoutePublic(
    reflector: Reflector,
    context: ExecutionContext,
  ): boolean {
    return reflector.get<boolean>(PUBLIC_KEY, context.getHandler());
  }

  protected isTelegrafListener(context: ExecutionContext): boolean {
    return context.getType() === TELEGRAM_CONTEXT_TYPE;
  }
}
