import { Prop } from '@nestjs/mongoose';
import { ObjectId } from 'bson';

export abstract class BaseSchema {
  public _id: ObjectId;

  public get id(): string {
    return this._id.toHexString();
  }

  @Prop({ default: Date.now })
  public createdAt?: Date;

  @Prop({ default: Date.now })
  public updatedAt?: Date;
}
