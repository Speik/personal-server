import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

import { BaseSchema } from './base.schema';

export type MessageDocument = HydratedDocument<Message>;

@Schema({ collection: 'messages', autoCreate: true })
export class Message extends BaseSchema {
  @Prop({ required: true })
  public name: string;

  @Prop({ required: true })
  public email: string;

  @Prop({ required: true })
  public text: string;
}

export const MessageSchema = SchemaFactory.createForClass(Message);
