import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { SkillsService } from './skills.service';
import { SkillsController } from './skills.controller';
import { Skill, SkillSchema } from '../schemas/skill.schema';

@Module({
  providers: [SkillsService],
  controllers: [SkillsController],
  imports: [
    MongooseModule.forFeature([{ name: Skill.name, schema: SkillSchema }]),
  ],
})
export class SkillsModule {}
