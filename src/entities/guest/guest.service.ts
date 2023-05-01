import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { CleanupDocuments } from 'src/decorators/cleanup-documents.decorator';
import { Guest, GuestDocument } from 'src/schemas/guest.schema';

@Injectable()
export class GuestService {
  public constructor(
    @InjectModel(Guest.name) private guestModel: Model<GuestDocument>,
  ) {}

  public async recordGuest(payload: Partial<Guest>): Promise<void> {
    await this.guestModel.create(payload);
  }

  @CleanupDocuments()
  public async getGuests(): Promise<Guest[]> {
    return await this.guestModel.find().sort({ createdAt: -1 });
  }
}
