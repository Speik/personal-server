import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { ObjectId } from 'bson';
import { Model } from 'mongoose';

import { CleanupDocuments } from 'src/decorators/cleanup-documents.decorator';
import { Message, MessageDocument } from 'src/schemas/message.schema';

@Injectable()
export class MessagesService {
  constructor(
    @InjectModel(Message.name)
    private messageModel: Model<MessageDocument>,
  ) {}

  public async getMessageById(id: string): Promise<Message> {
    return await this.messageModel.findOne({ _id: new ObjectId(id) });
  }

  @CleanupDocuments()
  public async getMessages(): Promise<Message[]> {
    return await this.messageModel.find().sort({ createdAt: -1 });
  }

  public async createMessage(message: Partial<Message>): Promise<void> {
    await this.messageModel.create(message);
  }

  public async deleteMessage(message: Message): Promise<void> {
    await this.messageModel.deleteOne({ _id: new ObjectId(message.id) });
  }
}
