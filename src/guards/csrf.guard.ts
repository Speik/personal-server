import {
  CanActivate,
  ExecutionContext,
  ForbiddenException,
} from '@nestjs/common';

import { ConfigService } from '@nestjs/config';
import { Reflector } from '@nestjs/core';
import { Request } from 'express';

import { SecurityGuard } from './security.guard';

const CSRF_HEADER_NAME = 'x-csrf-token';

export class CsrfGuard extends SecurityGuard implements CanActivate {
  constructor(
    private configService: ConfigService,
    private reflector: Reflector,
  ) {
    super();
  }

  public canActivate(context: ExecutionContext): boolean {
    const isPublic = this.isRoutePublic(this.reflector, context);
    const isTelegrafListener = this.isTelegrafListener(context);

    if (isPublic || isTelegrafListener) {
      return true;
    }

    const request = context.switchToHttp().getRequest<Request>();

    const csrfToken = this.configService.get<string>('CSRF_TOKEN');
    const hasCsrfToken = Reflect.has(request.headers, CSRF_HEADER_NAME);

    const isRequestValid = hasCsrfToken
      ? request.headers[CSRF_HEADER_NAME] === csrfToken
      : false;

    if (!isRequestValid) {
      throw new ForbiddenException(
        'Prevented potential CSRF. Token not found or invalid',
      );
    }

    return true;
  }
}
