import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';

import { SkillsService } from './skills.service';
import { SkillsController } from './skills.controller';
import { Skill, SkillSchema } from '../../schemas/skill.schema';

@Module({
  providers: [SkillsService],
  controllers: [SkillsController],
  imports: [
    MongooseModule.forFeature([{ name: Skill.name, schema: SkillSchema }]),
    ConfigModule,
    JwtModule,
  ],
})
export class SkillsModule {}
