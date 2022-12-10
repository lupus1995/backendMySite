import { ApiProperty } from "@nestjs/swagger";
import { IsBoolean, IsString } from "class-validator";

export class CreateArticleDto {
    @IsString()
    @ApiProperty({
        type: String,
        description: 'Заголовок статьи'
    })
    title: string;

    @IsString()
    @ApiProperty({
        type: String,
        description: 'Описание статьи'
    })
    description: string;

    @IsString()
    @ApiProperty({
        type: String,
        description: 'Превью статьи'
    })
    thumbnail: string;

    @IsString()
    @ApiProperty({
        type: String,
        description: 'Текст статьи'
    })
    text: string;

    @IsString()
    @ApiProperty({
        type: String,
        description: 'Ключевые слова статьи'
    })
    keyWords: string;

    @IsString()
    @ApiProperty({
        type: String,
        description: 'Дата создания'
    })
    createdAt: string;

    @IsString()
    @ApiProperty({
        type: String,
        description: 'Дата редактирования'
    })
    updatedAt: string;

    @IsString()
    @ApiProperty({
        type: String,
        description: 'Дата публикации'
    })
    publishedAt: string

    @IsBoolean()
    @ApiProperty({
        type: Boolean,
        description: 'Скрыть опубликованную статью'
    })
    hidePublishedArticle: boolean;
}