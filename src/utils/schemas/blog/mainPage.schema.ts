import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { Language } from './language.schema';

export type MainPageDocument = MainPage & Document;

@Schema()
export class MainPage {
  @Prop()
  firstBlockBackgroundImage: string;

  @Prop()
  firstBlockTitle: Language;

  @Prop()
  firstBlockSubtitle: Language;

  @Prop()
  aboutMeTitle: Language;

  @Prop()
  aboutMeDescription: Language;

  @Prop()
  aboutMePhoto: string;

  @Prop()
  descriptionPage: Language;

  @Prop()
  keyWordsPage: Language;
}

export const MainPageSchema = SchemaFactory.createForClass(MainPage);
