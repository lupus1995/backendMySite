import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

export type InterlocutorsType = Document<unknown, any, Interlocutors> &
  Omit<
    Interlocutors &
      Document & {
        _id: Types.ObjectId;
      },
    never
  >;
export type InterlocutorsDocument = Interlocutors & Document;

@Schema()
class Interlocutor {
  @Prop()
  interlocutorId: string;
  @Prop()
  messageId: string;
  @Prop()
  createdAt: Date;
}

@Schema()
export class Interlocutors {
  @Prop()
  userId: string;
  @Prop()
  interlocutors: Interlocutor[];
}

export const InterlocutorsSchema = SchemaFactory.createForClass(Interlocutors);

export const INTERLOCUTORS = {
  name: Interlocutors.name,
  schema: InterlocutorsSchema,
};
