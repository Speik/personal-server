import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

import { BaseSchema } from './base.schema';

export type CertificateDocument = HydratedDocument<Certificate>;

@Schema({ collection: 'certificates', autoCreate: true })
export class Certificate extends BaseSchema {
  @Prop({ required: true })
  public name: string;

  @Prop({ required: true })
  public issuerName: string;

  @Prop({ required: true })
  public credentialUrl: string;

  @Prop({ required: true })
  public year: number;

  @Prop({ required: true })
  public thumbnail: string;
}

export const CertificateSchema = SchemaFactory.createForClass(Certificate);
