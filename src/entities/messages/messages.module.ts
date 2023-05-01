import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';

import { MessagesService } from './messages.service';
import { MessagesController } from './messages.controller';
import { Message, MessageSchema } from 'src/schemas/message.schema';
import { TelegramService } from '../telegram/telegram.service';

@Module({
  providers: [MessagesService, TelegramService],
  controllers: [MessagesController],
  imports: [
    MongooseModule.forFeature([{ name: Message.name, schema: MessageSchema }]),
    ConfigModule,
    JwtModule,
  ],
})
export class MessagesModule {}
