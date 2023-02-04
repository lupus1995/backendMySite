import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsBoolean, IsString, ValidateNested } from 'class-validator';
import { LanguageDto } from '../../utils/dto/language.dto';

export class CreateArticleDto {
  @Type(() => LanguageDto)
  @ValidateNested()
  @ApiProperty({
    type: LanguageDto,
    description: 'Заголовок статьи',
  })
  title: LanguageDto;

  @Type(() => LanguageDto)
  @ValidateNested()
  @ApiProperty({
    type: LanguageDto,
    description: 'Описание статьи',
  })
  description: LanguageDto;

  @IsString()
  @ApiProperty({
    type: String,
    description: 'Превью статьи',
  })
  thumbnail: string;

  @Type(() => LanguageDto)
  @ValidateNested()
  @ApiProperty({
    type: LanguageDto,
    description: 'Текст статьи',
  })
  text: LanguageDto;

  @Type(() => LanguageDto)
  @ValidateNested()
  @ApiProperty({
    type: LanguageDto,
    description: 'Ключевые слова статьи',
  })
  keyWords: LanguageDto;

  @IsString()
  @ApiProperty({
    type: String,
    description: 'Дата создания',
  })
  createdAt: string;

  @IsString()
  @ApiProperty({
    type: String,
    description: 'Дата редактирования',
  })
  updatedAt: string;

  @IsString()
  @ApiProperty({
    type: String,
    description: 'Дата публикации',
  })
  publishedAt: string;

  @IsBoolean()
  @ApiProperty({
    type: Boolean,
    description: 'Скрыть опубликованную статью',
  })
  hidePublishedArticle: boolean;
}
