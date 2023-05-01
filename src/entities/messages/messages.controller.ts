import {
  BadRequestException,
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  UseGuards,
} from '@nestjs/common';

import { TelegramService } from '../telegram/telegram.service';

import { Throttle } from 'src/decorators/throttle.decorator';
import { AuthGuard } from 'src/guards/auth.guard';
import { CsrfGuard } from 'src/guards/csrf.guard';

import { Message } from 'src/schemas/message.schema';
import { MessagesService } from './messages.service';
import { MessageDto } from './messages.model';

@Controller('messages')
@UseGuards(CsrfGuard)
export class MessagesController {
  public constructor(
    private messagesService: MessagesService,
    private telegramService: TelegramService,
  ) {}

  @Get()
  @UseGuards(AuthGuard)
  @Throttle(1000)
  public async handleGetMessages(): Promise<Message[]> {
    return this.messagesService.getMessages();
  }

  @Post()
  public async handleCreateMessage(@Body() payload: MessageDto): Promise<void> {
    await this.messagesService.createMessage(payload);
    await this.telegramService.notifyIncomingMessage(payload);
  }

  @Delete(':id')
  @UseGuards(AuthGuard)
  public async handleDeleteMessage(@Param('id') id: string): Promise<void> {
    const message = await this.messagesService.getMessageById(id);

    if (!message) {
      throw new BadRequestException('Message not found');
    }

    return this.messagesService.deleteMessage(message);
  }
}
