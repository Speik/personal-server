import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

import { BaseSchema } from './base.schema';

export type SkillDocument = HydratedDocument<Skill>;

@Schema({ collection: 'skills', autoCreate: true })
export class Skill extends BaseSchema {
  @Prop({ required: true, unique: true })
  public name: string;

  @Prop({ required: true })
  public proficiency: number;
}

export const SkillSchema = SchemaFactory.createForClass(Skill);
