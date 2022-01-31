import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type UserDocument = User & Document;

@Schema()
export class User {
  @Prop()
  name: string;

  @Prop()
  email: string;

  @Prop()
  password: string;

  @Prop()
  createdOn: string;

  @Prop()
  isDeleted: boolean;

  @Prop()
  updatedOn: string;
}

export const UserSchema = SchemaFactory.createForClass(User);

export enum CacheTTLTime {
  ONE_MINUTE = 60,
  FIVE_MINUTE = 300,
  TEN_MINUTE = 600,
  FIFTEEN_MINUTE = 900,
  ONE_HOUR = 3600,
  THREE_HOUR = 10800,
}
