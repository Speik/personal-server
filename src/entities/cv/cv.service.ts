import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CleanupDocuments } from 'src/decorators/cleanup-documents.decorator';
import { Cv, CvDocument } from 'src/schemas/cv.schema';

@Injectable()
export class CvService {
  constructor(@InjectModel(Cv.name) private cvModel: Model<CvDocument>) {}

  @CleanupDocuments()
  public async getCv(): Promise<Cv> {
    const cv = await this.cvModel.findOne();
    return !cv ? <Cv>{ downloadFilename: '', file: '' } : cv;
  }

  public async updateCv(cv: Partial<Cv>): Promise<void> {
    await this.cvModel.deleteMany({});
    await this.cvModel.create(cv);
  }
}
