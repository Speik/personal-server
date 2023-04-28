import {
  Body,
  Controller,
  Delete,
  Get,
  NotFoundException,
  Param,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';

import { CsrfGuard } from 'src/guards/csrf.guard';
import { AuthGuard } from 'src/guards/auth.guard';
import { Throttle } from 'src/decorators/throttle.decorator';

import { JourneyService } from './journey.service';
import { Journey } from 'src/schemas/journey.schema';
import { JourneyDto } from './journey.model';

@Controller('journey')
@UseGuards(CsrfGuard)
export class JourneyController {
  constructor(private journeyService: JourneyService) {}

  @Get()
  @Throttle(1000)
  public handleGetJourneys(): Promise<Journey[]> {
    return this.journeyService.getJourneys();
  }

  @Post()
  @UseGuards(AuthGuard)
  public async handleJourneyCreate(
    @Body() payload: JourneyDto,
  ): Promise<Journey> {
    return this.journeyService.createJourney(payload);
  }

  @Patch(':id')
  @UseGuards(AuthGuard)
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
  @UseGuards(AuthGuard)
  public async handleJourneyDelete(@Param('id') id: string): Promise<void> {
    const journey = await this.journeyService.getJourneyById(id);

    if (!journey) {
      throw new NotFoundException('Journey not found');
    }

    return this.journeyService.deleteJourney(journey);
  }
}
