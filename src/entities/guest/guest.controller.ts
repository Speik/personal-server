import { BadRequestException, Controller, Get, Ip } from '@nestjs/common';

import { Public } from 'src/decorators/pulic.decorator';
import { IUserAgent, UserAgent } from 'src/decorators/user-agent.decorator';
import { Throttle } from 'src/decorators/throttle.decorator';

import { GuestService } from './guest.service';
import { Guest } from 'src/schemas/guest.schema';

const POSTMAN_IP = '::1';

@Controller('guests')
export class GuestController {
  public constructor(private guestService: GuestService) {}

  @Public()
  @Get('visit')
  public async handleVisit(
    @UserAgent() userAgent: IUserAgent,
    @Ip() ip: string,
  ): Promise<void> {
    // If Postman request
    if (ip === POSTMAN_IP) {
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
  @Throttle(1000)
  public async handleGetGuests(): Promise<Guest[]> {
    return this.guestService.getGuests();
  }
}
