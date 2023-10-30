import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

export type RoomsType = Document<unknown, any, Rooms> &
  Omit<
    Rooms &
      Document & {
        _id: Types.ObjectId;
      },
    never
  >;
export type RoomsDocument = Rooms & Document;

@Schema()
export class Rooms {
  @Prop()
  interlocutors: string[];
}

export const InterlocutorsSchema = SchemaFactory.createForClass(Rooms);

export const INTERLOCUTORS = {
  name: Rooms.name,
  schema: InterlocutorsSchema,
};
