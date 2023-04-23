import { Prop } from '@nestjs/mongoose';
import { ObjectId } from 'bson';

export abstract class BaseSchema {
  public _id: ObjectId;

  public get id(): string {
    return this._id.toHexString();
  }

  @Prop({ default: new Date() })
  public createdAt?: Date;

  @Prop({ default: new Date() })
  public updatedAt?: Date;
}
