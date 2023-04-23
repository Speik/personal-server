import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

import { BaseSchema } from './base.schema';

export type UserDocument = HydratedDocument<User>;

@Schema({ collection: 'users', autoCreate: true })
export class User extends BaseSchema {
  @Prop({ required: true, unique: true })
  public name: string;

  @Prop({ required: true })
  public password: string;
}

export const UserSchema = SchemaFactory.createForClass(User);
