import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { ObjectId } from 'bson';
import { Model } from 'mongoose';

import { CleanupDocuments } from 'src/decorators/cleanup-documents.decorator';

import {
  Certificate,
  CertificateDocument,
} from 'src/schemas/certificate.schema';

@Injectable()
export class CertificatesService {
  constructor(
    @InjectModel(Certificate.name)
    private certificateModel: Model<CertificateDocument>,
  ) {}

  public async getCertificateById(id: string): Promise<Certificate> {
    return await this.certificateModel.findOne({
      _id: new ObjectId(id),
    });
  }

  @CleanupDocuments()
  public async getCertificates(): Promise<Certificate[]> {
    return await this.certificateModel.find().sort({ createdAt: -1 });
  }

  public async createCertificate(
    certificate: Partial<Certificate>,
  ): Promise<Certificate> {
    return await this.certificateModel.create(certificate);
  }

  public async updateCertificate(
    id: string,
    certificate: Partial<Certificate>,
  ): Promise<void> {
    await this.certificateModel.updateOne(
      { _id: new ObjectId(id) },
      certificate,
    );
  }

  public async deleteCertificate({ id }: Partial<Certificate>): Promise<void> {
    await this.certificateModel.deleteOne({
      _id: new ObjectId(id),
    });
  }
}
