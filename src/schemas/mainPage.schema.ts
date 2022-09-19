import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type MainPageDocument = MainPage & Document;

@Schema()
export class MainPage {
  @Prop()
  firstBlockBackgroundImage: string;

  @Prop()
  firstBlockTitle: string;

  @Prop()
  firstBlockSubtitle: string;

  @Prop()
  aboutMeTitle: string;

  @Prop()
  aboutMeDescription: string;

  @Prop()
  aboutMePhoto: string;
}

export const MainPageSchema = SchemaFactory.createForClass(MainPage);

