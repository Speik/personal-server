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
import { Throttle } from 'src/decorators/throttle.decorator';

import { Public } from 'src/decorators/pulic.decorator';

import { CertificatesService } from './certificates.service';
import { Certificate } from 'src/schemas/certificate.schema';
import { CertificateDto } from './certificates.model';

@Controller('certificates')
export class CertificatesController {
  constructor(private certificatesService: CertificatesService) {}

  @Public()
  @Get()
  @Throttle(1000)
  public handleGetCertificates(): Promise<Certificate[]> {
    return this.certificatesService.getCertificates();
  }

  @Post()
  public async handleCertificateCreate(
    @Body() payload: CertificateDto,
  ): Promise<Certificate> {
    return this.certificatesService.createCertificate(payload);
  }

  @Patch(':id')
  public async handleCertificateUpdate(
    @Param('id') id: string,
    @Body() payload: Certificate,
  ): Promise<void> {
    const certificate = await this.certificatesService.getCertificateById(id);

    if (!certificate) {
      throw new NotFoundException('Certificate not found');
    }

    return this.certificatesService.updateCertificate(id, payload);
  }

  @Delete(':id')
  public async handleCertificateDelete(@Param('id') id: string): Promise<void> {
    const certificate = await this.certificatesService.getCertificateById(id);

    if (!certificate) {
      throw new NotFoundException('Certificate not found');
    }

    return this.certificatesService.deleteCertificate(certificate);
  }
}
