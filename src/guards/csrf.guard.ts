import {
  CanActivate,
  ExecutionContext,
  ForbiddenException,
} from '@nestjs/common';

import { Reflector } from '@nestjs/core';
import { Request } from 'express';

import { CsrfService } from 'src/entities/csrf/csrf.service';
import { SecurityGuard } from './security.guard';

export class CsrfGuard extends SecurityGuard implements CanActivate {
  constructor(private reflector: Reflector, private csrfService: CsrfService) {
    super();
  }

  public canActivate(context: ExecutionContext): boolean {
    const isPublic = this.isRoutePublic(this.reflector, context);
    const isTelegrafListener = this.isTelegrafListener(context);

    if (isPublic || isTelegrafListener) {
      return true;
    }

    const request = context.switchToHttp().getRequest<Request>();
    const isRequestValid = this.csrfService.validateToken(request);

    if (!isRequestValid) {
      throw new ForbiddenException(
        'Prevented potential CSRF. Token not found or invalid',
      );
    }

    return true;
  }
}
