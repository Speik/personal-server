import {
  BadRequestException,
  Body,
  Controller,
  Delete,
  Get,
  NotFoundException,
  Param,
  Patch,
  Post,
} from '@nestjs/common';

import { Public } from 'src/decorators/pulic.decorator';
import { Throttle } from 'src/decorators/throttle.decorator';

import { SkillsService } from './skills.service';
import { Skill } from 'src/schemas/skill.schema';
import { SkillDto } from './skills.model';

@Controller('skills')
export class SkillsController {
  constructor(private skillsService: SkillsService) {}

  @Public()
  @Get()
  @Throttle(1000)
  public handleGetSkills(): Promise<Skill[]> {
    return this.skillsService.getSkills();
  }

  @Post()
  public async handleSkillCreate(@Body() payload: SkillDto): Promise<Skill> {
    const skill = await this.skillsService.getSkillByName(payload);

    if (skill) {
      throw new BadRequestException('Skill with such name already exists');
    }

    return this.skillsService.createSkill(payload);
  }

  @Patch(':id')
  public async handleSkillUpdate(
    @Param('id') id: string,
    @Body() payload: SkillDto,
  ): Promise<void> {
    const skill = await this.skillsService.getSkillById(id);

    if (!skill) {
      throw new NotFoundException('Skill not found');
    }

    const skillByName = await this.skillsService.getSkillByName({
      ...skill,
      name: payload.name.trim(),
    });

    if (skillByName) {
      throw new BadRequestException('Skill with such name already exists');
    }

    return this.skillsService.updateSkill(id, payload);
  }

  @Delete(':id')
  public async handleSkillDelete(@Param('id') id: string): Promise<void> {
    const skill = await this.skillsService.getSkillById(id);

    if (!skill) {
      throw new NotFoundException('Skill not found');
    }

    return this.skillsService.deleteSkill(skill);
  }
}
