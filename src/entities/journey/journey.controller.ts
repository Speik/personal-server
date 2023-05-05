import {
  Body,
  Controller,
  Delete,
  Get,
  NotFoundException,
  Param,
  Patch,
  Post,
} from '@nestjs/common';

import { Public } from 'src/decorators/pulic.decorator';
import { Throttle } from 'src/decorators/throttle.decorator';

import { JourneyService } from './journey.service';
import { Journey } from 'src/schemas/journey.schema';
import { JourneyDto } from './journey.model';

@Controller('journey')
export class JourneyController {
  constructor(private journeyService: JourneyService) {}

  @Public()
  @Get()
  @Throttle(1000)
  public handleGetJourneys(): Promise<Journey[]> {
    return this.journeyService.getJourneys();
  }

  @Post()
  public async handleJourneyCreate(
    @Body() payload: JourneyDto,
  ): Promise<Journey> {
    return this.journeyService.createJourney(payload);
  }

  @Patch(':id')
  public async handleJourneyUpdate(
    @Param('id') id: string,
    @Body() payload: JourneyDto,
  ): Promise<void> {
    const journey = await this.journeyService.getJourneyById(id);

    if (!journey) {
      throw new NotFoundException('Journey not found');
    }

    return this.journeyService.updateJourney(id, payload);
  }

  @Delete(':id')
  public async handleJourneyDelete(@Param('id') id: string): Promise<void> {
    const journey = await this.journeyService.getJourneyById(id);

    if (!journey) {
      throw new NotFoundException('Journey not found');
    }

    return this.journeyService.deleteJourney(journey);
  }
}
