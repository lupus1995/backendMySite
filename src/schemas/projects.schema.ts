import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

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
  title: string;

  @Prop()
  thumbnail: string;

  @Prop()
  description: string;

  @Prop()
  linkToProjectOnUi: string;

  @Prop()
  hidePublished: boolean;
}

export const ProjectsSchema = SchemaFactory.createForClass(Projects);
