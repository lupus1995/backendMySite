import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

import { Language } from './language.schema';

export type ProjectsDocument = Projects & Document;

@Schema()
export class Projects {
  @Prop()
  createdAt: Date;

  @Prop()
  updatedAt: Date;

  @Prop()
  publishedAt: Date;

  @Prop()
  title: Language;

  @Prop()
  thumbnail: string;

  @Prop()
  description: Language;

  @Prop()
  linkToProjectOnUi: string;

  @Prop()
  keyWords: Language;

  @Prop()
  hidePublished: boolean;
}

export const ProjectsSchema = SchemaFactory.createForClass(Projects);
