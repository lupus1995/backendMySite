import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsString, IsBoolean, ValidateNested } from 'class-validator';

import { LanguageDto } from '../../utils/dto/language.dto';

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

  @Type(() => LanguageDto)
  @ValidateNested()
  @ApiProperty({
    type: LanguageDto,
    description: 'Название проекта',
  })
  title: LanguageDto;

  @IsString()
  @ApiProperty({
    type: String,
    description: 'Превью проекта',
  })
  thumbnail: string;

  @Type(() => LanguageDto)
  @ValidateNested()
  @ApiProperty({
    type: LanguageDto,
    description: 'Описание проекта',
  })
  description: LanguageDto;

  @IsString()
  @ApiProperty({
    type: String,
    description: 'Ссылка на проект, по которойдолжен отрисовать проект',
  })
  linkToProjectOnUi: string;

  @Type(() => LanguageDto)
  @ValidateNested()
  @ApiProperty({
    type: LanguageDto,
    description: 'Ключевые слова для сео оптимизации',
  })
  keyWords: LanguageDto;

  @IsBoolean()
  @ApiProperty({
    type: Boolean,
    description: 'Скрыть опубликованную статью',
  })
  hidePublished: boolean;
}
