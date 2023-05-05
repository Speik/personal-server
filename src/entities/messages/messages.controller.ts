import {
  BadRequestException,
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
} from '@nestjs/common';

import { TelegramService } from '../telegram/telegram.service';

import { Public } from 'src/decorators/pulic.decorator';
import { Throttle } from 'src/decorators/throttle.decorator';

import { Message } from 'src/schemas/message.schema';
import { MessagesService } from './messages.service';
import { MessageDto } from './messages.model';

@Controller('messages')
export class MessagesController {
  public constructor(
    private messagesService: MessagesService,
    private telegramService: TelegramService,
  ) {}

  @Get()
  @Throttle(1000)
  public async handleGetMessages(): Promise<Message[]> {
    return this.messagesService.getMessages();
  }

  @Public()
  @Post()
  public async handleCreateMessage(@Body() payload: MessageDto): Promise<void> {
    await this.messagesService.createMessage(payload);
    await this.telegramService.notifyIncomingMessage(payload);
  }

  @Delete(':id')
  public async handleDeleteMessage(@Param('id') id: string): Promise<void> {
    const message = await this.messagesService.getMessageById(id);

    if (!message) {
      throw new BadRequestException('Message not found');
    }

    return this.messagesService.deleteMessage(message);
  }
}
