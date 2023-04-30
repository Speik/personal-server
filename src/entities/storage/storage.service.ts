import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { ObjectId } from 'bson';
import { unlink } from 'fs/promises';
import { Model } from 'mongoose';
import { join } from 'path';

import { CleanupDocuments } from 'src/decorators/cleanup-documents.decorator';
import { StorageItem, StorageItemDocument } from 'src/schemas/storage.schema';
import { getPublicPath } from 'src/utils';

const STORAGE_PATH = join(getPublicPath(), 'storage');

@Injectable()
export class StorageService {
  constructor(
    @InjectModel(StorageItem.name)
    private storageModel: Model<StorageItemDocument>,
  ) {}

  public async getFileById(id: string): Promise<StorageItem> {
    return await this.storageModel.findOne({ _id: new ObjectId(id) });
  }

  @CleanupDocuments()
  public async getFiles(): Promise<StorageItem[]> {
    return await this.storageModel.find().sort({ createdAt: -1 });
  }

  @CleanupDocuments()
  public async getImages(): Promise<StorageItem[]> {
    return await this.storageModel
      .find({
        name: /\..*jpg|png/,
      })
      .sort({ createdAt: -1 });
  }

  public async saveFile(file: Express.Multer.File): Promise<void> {
    await this.storageModel.create({
      name: file.filename,
      originalName: file.originalname,
      size: file.size,
    });
  }

  public async deleteFile(file: StorageItem): Promise<void> {
    await this.storageModel.deleteOne({ _id: new ObjectId(file.id) });
    await unlink(join(STORAGE_PATH, file.name));
  }
}
