import { Controller, Get, Ip } from '@nestjs/common';

import { Public } from 'src/decorators/pulic.decorator';
import { IUserAgent, UserAgent } from 'src/decorators/user-agent.decorator';
import { Throttle } from 'src/decorators/throttle.decorator';

import { TelegramService } from '../telegram/telegram.service';

import { GuestService } from './guest.service';
import { Guest } from 'src/schemas/guest.schema';

const POSTMAN_IP = '::1';
const BASE_WHOIS_URL = 'http://ipwho.is/';

@Controller('guests')
export class GuestController {
  public constructor(
    private guestService: GuestService,
    private telegramService: TelegramService,
  ) {}

  @Get()
  @Throttle(1000)
  public async handleGetGuests(): Promise<Guest[]> {
    return this.guestService.getGuests();
  }

  @Public()
  @Get('visit')
  public async handleVisit(
    @UserAgent() userAgent: IUserAgent,
    @Ip() ip: string,
  ): Promise<void> {
    const isPostmanIp = ip === POSTMAN_IP;
    const isLocalhost = ip.startsWith('192.168');
    const isIpValid = Boolean(ip) && !isPostmanIp && !isLocalhost;

    /**
     * If request send from postman or from localhost,
     * send request to API as server
     */
    const url = isIpValid ? `${BASE_WHOIS_URL}${ip}` : BASE_WHOIS_URL;

    const response = await fetch(url);
    const details = await response.json();

    const guestPayload = {
      ip: details.ip,
      country: details.country,
      city: details.city,
      flag: details.flag.emoji,
      userAgent: userAgent.ua,
      browser: userAgent.browser.name,
      os: userAgent.os.name,
    };

    await this.guestService.recordGuest(guestPayload);
    await this.telegramService.notifyNewVisit(guestPayload);
  }
}
