import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { ObjectId } from 'bson';
import { Model } from 'mongoose';

import { Journey, JourneyDocument } from 'src/schemas/journey.schema';
import { CleanupDocuments } from 'src/decorators/cleanup-documents.decorator';

@Injectable()
export class JourneyService {
  constructor(
    @InjectModel(Journey.name) private journeyModel: Model<JourneyDocument>,
  ) {}

  public async getJourneyById(id: string): Promise<Journey> {
    return await this.journeyModel.findOne({ _id: new ObjectId(id) });
  }

  @CleanupDocuments()
  public async getJourneys(): Promise<Journey[]> {
    return await this.journeyModel.find().sort({ startedAt: -1 });
  }

  public async createJourney(journey: Partial<Journey>): Promise<Journey> {
    return await this.journeyModel.create(journey);
  }

  public async updateJourney(
    id: string,
    journey: Partial<Journey>,
  ): Promise<void> {
    await this.journeyModel.updateOne({ _id: new ObjectId(id) }, journey);
  }

  public async deleteJourney({ id }: Partial<Journey>): Promise<void> {
    await this.journeyModel.deleteOne({
      _id: new ObjectId(id),
    });
  }
}
