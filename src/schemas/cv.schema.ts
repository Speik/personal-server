import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

import { BaseSchema } from './base.schema';

export type CvDocument = HydratedDocument<Cv>;

@Schema({ collection: 'cv', autoCreate: true })
export class Cv extends BaseSchema {
  @Prop({ required: true, unique: true })
  public downloadFilename: string;

  @Prop({ required: true, unique: true })
  public file: string;
}

export const CvSchema = SchemaFactory.createForClass(Cv);
