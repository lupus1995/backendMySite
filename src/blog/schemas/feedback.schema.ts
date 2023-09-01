import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type FeedbackDocument = Feedback & Document;

@Schema()
export class Feedback {
  @Prop()
  username: string;

  @Prop()
  text: string;
}

export const FeedbackSchema = SchemaFactory.createForClass(Feedback);
