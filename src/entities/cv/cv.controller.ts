import { Response } from 'express';
import { createReadStream } from 'fs';
import { extname, join } from 'path';

import {
  Body,
  Controller,
  Get,
  Post,
  Res,
  StreamableFile,
} from '@nestjs/common';

import { Public } from 'src/decorators/pulic.decorator';
import { Throttle } from 'src/decorators/throttle.decorator';

import { getPublicPath } from 'src/utils';

import { CvService } from './cv.service';
import { Cv } from 'src/schemas/cv.schema';
import { CvDto } from './cv.model';

@Controller('cv')
export class CvController {
  public constructor(private cvService: CvService) {}

  @Public()
  @Get('download')
  public async handleDownloadCv(
    @Res({ passthrough: true }) res: Response,
  ): Promise<StreamableFile> {
    const cv = await this.cvService.getCv();
    const attachmentPath = join(getPublicPath(), 'storage', cv.file);
    const stream = createReadStream(attachmentPath);

    res.setHeader('Content-Type', 'application/octet-stream');
    res.setHeader(
      'Content-Disposition',
      `attachment; filename="${cv.downloadFilename}${extname(cv.file)}"`,
    );

    return new StreamableFile(stream);
  }

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
