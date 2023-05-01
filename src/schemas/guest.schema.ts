import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

import { BaseSchema } from './base.schema';

export type GuestDocument = HydratedDocument<Guest>;

@Schema({ collection: 'guests', autoCreate: true })
export class Guest extends BaseSchema {
  @Prop({ required: true })
  public ip: string;

  @Prop({ required: true })
  public country: string;

  @Prop({ required: true })
  public city: string;

  @Prop({ required: true })
  public flag: string;

  @Prop({ required: true })
  public userAgent: string;

  @Prop({ default: null })
  public browser?: string | null;

  @Prop({ default: null })
  public os?: string | null;
}

export const GuestSchema = SchemaFactory.createForClass(Guest);
