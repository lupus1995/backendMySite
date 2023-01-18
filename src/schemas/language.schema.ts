import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

export type LAnguageDocument = Language & Document;

@Schema()
export class Language {
  @Prop()
  en: string;

  @Prop()
  ru: string;
}

export const LanguageSchema = SchemaFactory.createForClass(Language);
