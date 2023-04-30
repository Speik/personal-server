import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule } from '@nestjs/config';

import { CertificatesService } from './certificates.service';
import { CertificatesController } from './certificates.controller';
import { Certificate, CertificateSchema } from 'src/schemas/certificate.schema';

@Module({
  providers: [CertificatesService],
  controllers: [CertificatesController],
  imports: [
    MongooseModule.forFeature([
      { name: Certificate.name, schema: CertificateSchema },
    ]),
    ConfigModule,
    JwtModule,
  ],
})
export class CertificatesModule {}
