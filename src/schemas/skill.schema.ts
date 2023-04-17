import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type SkillDocument = HydratedDocument<Skill>;

@Schema({ collection: 'skills', autoCreate: true })
export class Skill {
  @Prop({ required: true, unique: true })
  name: string;
  @Prop({ required: true })
  proficiency: number;
}

export const SkillSchema = SchemaFactory.createForClass(Skill);
