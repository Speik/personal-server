import { Injectable } from '@nestjs/common';
import { TelegramContext } from './telegram.context';
import { SkillsService } from '../skills/skills.service';

@Injectable()
export class TelegramHandler {
  constructor(private skillsService: SkillsService) {}

  public async showSkills(ctx: TelegramContext): Promise<void> {
    const skills = await this.skillsService.getSkills();

    skills.forEach((skill) => {
      ctx.replyWithHTML(`<b>${skill.name}</b> - ${skill.proficiency}%`);
    });
  }

  public async showSocial(ctx: TelegramContext): Promise<void> {
    ctx.reply("It's your social links");
  }

  public async showInbox(ctx: TelegramContext): Promise<void> {
    ctx.reply("It's your inbox");
  }

  public async showResume(ctx: TelegramContext): Promise<void> {
    ctx.reply("It's your CV");
  }
}
