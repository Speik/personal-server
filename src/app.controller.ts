import { Controller, Get, UseGuards } from '@nestjs/common';

import { CsrfGuard } from './guards/csrf.guard';
import { AuthGuard } from './guards/auth.guard';

@Controller()
@UseGuards(CsrfGuard, AuthGuard)
export class AppController {
  @Get('ping')
  public getPong(): string {
    return 'pong';
  }
}
