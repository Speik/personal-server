import {
  BadRequestException,
  Controller,
  Get,
  Ip,
  UseGuards,
} from '@nestjs/common';

import { CsrfGuard } from 'src/guards/csrf.guard';
import { AuthGuard } from 'src/guards/auth.guard';

import { IUserAgent, UserAgent } from 'src/decorators/user-agent.decorator';
import { Throttle } from 'src/decorators/throttle.decorator';

import { GuestService } from './guest.service';
import { Guest } from 'src/schemas/guest.schema';

@Controller('guests')
@UseGuards(CsrfGuard)
export class GuestController {
  public constructor(private guestService: GuestService) {}

  @Get('visit')
  public async handleVisit(
    @UserAgent() userAgent: IUserAgent,
    @Ip() ip: string,
  ): Promise<void> {
    // If Postman request
    if (ip === '::1') {
      throw new BadRequestException("Visit can't be recorded");
    }

    const response = await fetch(`http://ipwho.is/${ip}`);
    const details = await response.json();

    return this.guestService.recordGuest({
      ip,
      country: details.country,
      city: details.city,
      flag: details.flag.emoji,
      userAgent: userAgent.ua,
      browser: userAgent.browser.name,
      os: userAgent.os.name,
    });
  }

  @Get()
  @UseGuards(AuthGuard)
  @Throttle(1000)
  public async handleGetGuests(): Promise<Guest[]> {
    return this.guestService.getGuests();
  }
}
