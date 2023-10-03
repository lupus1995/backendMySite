import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

export type UserType = Document<unknown, any, UserDocument> &
  Omit<
    User &
      Document & {
        _id: Types.ObjectId;
      },
    never
  >;

export type UserDocument = User & Document;

@Schema()
export class User {
  @Prop()
  lastname: string;

  @Prop()
  firstname: string;

  @Prop()
  patronymic: string;

  @Prop()
  username: string;

  @Prop()
  email: string;

  @Prop()
  password: string;

  @Prop()
  avatar: string;

  @Prop()
  listOfBlockedInterlocutors: string[];

  @Prop()
  listIOfDeletedDialogs: string[];
}

export const UserSchema = SchemaFactory.createForClass(User);

export const USER = { name: User.name, schema: UserSchema };
