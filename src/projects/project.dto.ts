import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsBoolean } from 'class-validator';

export class ProjectDto {
  @IsString()
  @ApiProperty({
    type: String,
    description: 'Дата создания',
  })
  createdAt: string;

  @IsString()
  @ApiProperty({
    type: String,
    description: 'Дата редактирования проекта',
  })
  updatedAt: string;

  @IsString()
  @ApiProperty({
    type: String,
    description: 'Дата публикации проекта',
  })
  publishedAt: string;

  @IsString()
  @ApiProperty({
    type: String,
    description: 'Название проекта',
  })
  title: string;

  @IsString()
  @ApiProperty({
    type: String,
    description: 'Превью проекта',
  })
  thumbnail: string;

  @IsString()
  @ApiProperty({
    type: String,
    description: 'Описание проекта',
  })
  description: string;

  @IsString()
  @ApiProperty({
    type: String,
    description: 'Ссылка на проект, по которойдолжен отрисовать проект',
  })
  linkToProjectOnUi: string;

  @IsBoolean()
  @ApiProperty({
    type: Boolean,
    description: 'Скрыть опубликованную статью',
  })
  hidePublished: boolean;
}
