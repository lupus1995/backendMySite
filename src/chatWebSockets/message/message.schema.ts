import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

export type MessageDocument = Message & Document;

@Schema()
export class Message {
  @Prop()
  from: string;

  @Prop()
  to: string;

  @Prop()
  typeMessage: string;

  @Prop()
  isArchive: boolean;

  @Prop()
  value: string;

  @Prop()
  linkToImage: string;

  @Prop()
  linkToAudio: string;

  @Prop()
  createdAt: Date;

  @Prop()
  updatedAt: Date;
}

export const MessageSchema = SchemaFactory.createForClass(Message);

export const MESSAGE = { name: Message.name, schema: MessageSchema };
