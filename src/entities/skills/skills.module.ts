import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';

import { SkillsService } from './skills.service';
import { SkillsController } from './skills.controller';
import { Skill, SkillSchema } from '../../schemas/skill.schema';

@Module({
  providers: [SkillsService],
  exports: [SkillsService],
  controllers: [SkillsController],
  imports: [
    MongooseModule.forFeature([{ name: Skill.name, schema: SkillSchema }]),
    ConfigModule,
  ],
})
export class SkillsModule {}
