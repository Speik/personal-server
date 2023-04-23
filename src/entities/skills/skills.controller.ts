import { Controller, Get, UseGuards } from '@nestjs/common';

import { CsrfGuard } from 'src/guards/csrf.guard';
import { AuthGuard } from 'src/guards/auth.guard';
import { SkillsService } from './skills.service';
import { Skill } from 'src/schemas/skill.schema';
import { Throttle } from 'src/decorators/throttle.decorator';

@Controller('skills')
@UseGuards(CsrfGuard, AuthGuard)
export class SkillsController {
  constructor(private skillsService: SkillsService) {}

  @Get()
  @Throttle(1000)
  public getSkills(): Promise<Skill[]> {
    return this.skillsService.getSkills();
  }
}
