import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

import { BaseSchema } from './base.schema';

export type JourneyDocument = HydratedDocument<Journey>;

@Schema({ collection: 'journeys', autoCreate: true })
export class Journey extends BaseSchema {
  @Prop({ required: true })
  public employerName: string;

  @Prop({ required: true })
  public jobTitle: string;

  @Prop({ required: true })
  public shortDescription: string;

  @Prop({ required: true })
  public startedAt: Date;

  @Prop({ default: null })
  public endedAt?: Date | null;

  @Prop({ required: true })
  public description: string;

  @Prop({ required: true })
  public skills: string[];
}

export const JourneySchema = SchemaFactory.createForClass(Journey);
