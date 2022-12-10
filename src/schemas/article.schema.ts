import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type ArticleDocument = Article & Document;

@Schema()
export class Article {
    @Prop()
    title: string;

    @Prop()
    description: string;

    @Prop()
    thumbnail: string;

    @Prop()
    text: string;

    @Prop()
    createdAt: Date;

    @Prop()
    updatedAt: Date;

    @Prop()
    publishedAt: Date;

    @Prop()
    keyWords: string;

    @Prop()
    hidePublishedArticle: boolean;
}

export const ArticleSchema = SchemaFactory.createForClass(Article);