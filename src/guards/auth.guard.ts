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

const AUTHENTICATION_HEADER_NAME = 'x-authentication';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private configService: ConfigService) {}

  public canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const request = context.switchToHttp().getRequest<Request>();

    const authenticationToken = this.configService.get<string>('AUTH_TOKEN');
    const hasAuthentication = Reflect.has(
      request.headers,
      AUTHENTICATION_HEADER_NAME,
    );

    const isAuthenticated = hasAuthentication
      ? request.headers[AUTHENTICATION_HEADER_NAME] === authenticationToken
      : false;

    if (!isAuthenticated) {
      throw new HttpException('Authentication failed', HttpStatus.FORBIDDEN);
    }

    return true;
  }
}
