import { Controller, Get, Req, Res } from '@nestjs/common';
import { CookieOptions, Request, Response } from 'express';

import { Public } from './decorators/pulic.decorator';
import { CsrfService } from './entities/csrf/csrf.service';

import {
  CSRF_TOKEN_COOKIE_NAME,
  CSRF_HASH_COOKIE_NAME,
} from './entities/csrf/csrf.service';

@Controller()
export class AppController {
  public constructor(private csrfService: CsrfService) {}

  @Public()
  @Get('ping')
  public handlePing(): string {
    return 'pong';
  }

  @Public()
  @Get('preconnect')
  public handlePreconnect(
    @Req() req: Request,
    @Res({ passthrough: true }) res: Response,
  ): any {
    const token = this.csrfService.generateToken();
    const tokenHash = this.csrfService.generateTokenHash(token);

    const cookiesConfig: CookieOptions = {
      domain: '192.168.1.9',
      path: '/',
      httpOnly: false,
    };

    res.cookie(CSRF_TOKEN_COOKIE_NAME, token, cookiesConfig);
    res.cookie(CSRF_HASH_COOKIE_NAME, tokenHash, {
      ...cookiesConfig,
      httpOnly: true,
    });

    return { status: 'Connected' };
  }
}
