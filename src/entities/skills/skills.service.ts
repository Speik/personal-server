import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { ObjectId } from 'bson';
import { Model } from 'mongoose';

import { Skill, SkillDocument } from 'src/schemas/skill.schema';
import { CleanupDocuments } from 'src/decorators/cleanup-documents.decorator';

@Injectable()
export class SkillsService {
  constructor(
    @InjectModel(Skill.name) private skillModel: Model<SkillDocument>,
  ) {}

  public async getSkillById(skillId: string): Promise<Skill> {
    return this.skillModel.findOne({ _id: new ObjectId(skillId) });
  }

  public async getSkillByName(skill: Partial<Skill>): Promise<Skill> {
    return this.skillModel.findOne({ name: skill.name.trim() });
  }

  @CleanupDocuments()
  public getSkills(): Promise<Skill[]> {
    return this.skillModel.find().sort({ proficiency: -1 });
  }

  public createSkill(skill: Partial<Skill>): Promise<Skill> {
    return this.skillModel.create({
      name: skill.name.trim(),
      proficiency: skill.proficiency,
    });
  }

  public async updateSkill(id: string, skill: Partial<Skill>): Promise<void> {
    await this.skillModel.updateOne({ _id: new ObjectId(id) }, skill);
  }

  public async deleteSkill({ id }: Partial<Skill>): Promise<void> {
    await this.skillModel.deleteOne({
      _id: new ObjectId(id),
    });
  }
}
