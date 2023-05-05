import { Controller, Get } from '@nestjs/common';
import { Public } from './decorators/pulic.decorator';

@Controller()
export class AppController {
  @Public()
  @Get('ping')
  public handlePing(): string {
    return 'pong';
  }
}
