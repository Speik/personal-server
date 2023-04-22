import { Controller, Get, UseGuards } from '@nestjs/common';

import { SkillsService } from './skills.service';
import { AuthGuard } from 'src/guards/auth.guard';

@Controller('skills')
@UseGuards(AuthGuard)
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
