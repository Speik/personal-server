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
  UseGuards,
} from '@nestjs/common';

import { CsrfGuard } from 'src/guards/csrf.guard';
import { AuthGuard } from 'src/guards/auth.guard';
import { SkillsService } from './skills.service';
import { Skill } from 'src/schemas/skill.schema';
import { Throttle } from 'src/decorators/throttle.decorator';
import { SkillDto } from './skills.model';

@Controller('skills')
@UseGuards(CsrfGuard)
export class SkillsController {
  constructor(private skillsService: SkillsService) {}

  @Get()
  @Throttle(1000)
  public handleGetSkills(): Promise<Skill[]> {
    return this.skillsService.getSkills();
  }

  @Post()
  @UseGuards(AuthGuard)
  public async handleSkillCreate(@Body() payload: SkillDto): Promise<Skill> {
    const skill = await this.skillsService.getSkillByName(payload);

    if (skill) {
      throw new BadRequestException('Skill with such name already exists');
    }

    return this.skillsService.createSkill(payload);
  }

  @Patch(':id')
  @UseGuards(AuthGuard)
  public async handleSkillUpdate(
    @Param('id') id: string,
    @Body() payload: SkillDto,
  ): Promise<void> {
    const skill = await this.skillsService.getSkillById(id);

    if (!skill) {
      throw new NotFoundException('Skill not found');
    }

    return this.skillsService.updateSkill(id, payload);
  }

  @Delete(':id')
  @UseGuards(AuthGuard)
  public async handleSkillDelete(@Param('id') skillId: string): Promise<void> {
    const skill = await this.skillsService.getSkillById(skillId);

    if (!skill) {
      throw new NotFoundException('Skill not found');
    }

    return this.skillsService.deleteSkill(skill);
  }
}
