import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';

import { CsrfGuard } from 'src/guards/csrf.guard';
import { AuthGuard } from 'src/guards/auth.guard';
import { Throttle } from 'src/decorators/throttle.decorator';

import { CvService } from './cv.service';
import { Cv } from 'src/schemas/cv.schema';
import { CvDto } from './cv.model';

@Controller('cv')
@UseGuards(CsrfGuard, AuthGuard)
export class CvController {
  public constructor(private cvService: CvService) {}

  @Get()
  @Throttle(1000)
  public handleGetCv(): Promise<Cv> {
    return this.cvService.getCv();
  }

  @Post()
  public handleUpdateCv(@Body() payload: CvDto): Promise<void> {
    return this.cvService.updateCv(payload);
  }
}
