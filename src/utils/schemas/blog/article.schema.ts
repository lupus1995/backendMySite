import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

import { Language } from './language.schema';

export type ArticleDocument = Article & Document;

@Schema()
export class Article {
  @Prop()
  title: Language;

  @Prop()
  description: Language;

  @Prop()
  thumbnail: string;

  @Prop()
  text: Language;

  @Prop()
  createdAt: Date;

  @Prop()
  updatedAt: Date;

  @Prop()
  publishedAt: Date;

  @Prop()
  keyWords: Language;

  @Prop()
  hidePublishedArticle: boolean;

  @Prop()
  isPublishedlegram: boolean;

  @Prop()
  isPublishedVK: boolean;
}

export const ArticleSchema = SchemaFactory.createForClass(Article);
