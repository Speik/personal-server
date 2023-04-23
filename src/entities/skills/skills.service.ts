import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { Skill, SkillDocument } from 'src/schemas/skill.schema';

@Injectable()
export class SkillsService {
  constructor(
    @InjectModel(Skill.name) private skillModel: Model<SkillDocument>,
  ) {}

  public getSkills(): Promise<Skill[]> {
    return this.skillModel.find().sort({ proficiency: -1 }).exec();
  }
}
