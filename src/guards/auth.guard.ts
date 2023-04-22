import {
  Injectable,
  CanActivate,
  ExecutionContext,
  HttpException,
  HttpStatus,
} from '@nestjs/common';

import { ConfigService } from '@nestjs/config';
import { Request } from 'express';
import { Observable } from 'rxjs';

const AUTHENTICATION_HEADER_NAME = 'x-csrf-token';

@Injectable()
export class CsrfGuard implements CanActivate {
  constructor(private configService: ConfigService) {}

  public canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const request = context.switchToHttp().getRequest<Request>();

    const csrfToken = this.configService.get<string>('CSRF_TOKEN');
    const hasCsrfToken = Reflect.has(
      request.headers,
      AUTHENTICATION_HEADER_NAME,
    );

    const isRequestValid = hasCsrfToken
      ? request.headers[AUTHENTICATION_HEADER_NAME] === csrfToken
      : false;

    if (!isRequestValid) {
      throw new HttpException(
        'Authentication failed due to CSRF guard has been triggered',
        HttpStatus.FORBIDDEN,
      );
    }

    return true;
  }
}
