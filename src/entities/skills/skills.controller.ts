import { Controller, Get, UseGuards } from '@nestjs/common';

import { SkillsService } from './skills.service';
import { CsrfGuard } from 'src/guards/auth.guard';

@Controller('skills')
@UseGuards(CsrfGuard)
export class SkillsController {
  constructor(private skillsService: SkillsService) {}

  @Get('ping')
  public getPong() {
    return { ping: 'pong' };
  }

  @Get()
  public getSkills() {
    return this.skillsService.getSkills();
  }
}
