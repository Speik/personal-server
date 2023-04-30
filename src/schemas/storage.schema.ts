import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

import { BaseSchema } from './base.schema';

export type StorageItemDocument = HydratedDocument<StorageItem>;

@Schema({ collection: 'storage', autoCreate: true })
export class StorageItem extends BaseSchema {
  @Prop({ required: true, unique: true })
  public name: string;

  @Prop({ required: true })
  public originalName: string;

  @Prop({ required: true })
  public size: number;
}

export const StorageItemSchema = SchemaFactory.createForClass(StorageItem);
