import { ApiProperty } from "@nestjs/swagger";

export class CreateArticleDto {
    @ApiProperty({
        type: String,
        description: 'Заголовок статьи'
    })
    title: string;

    @ApiProperty({
        type: String,
        description: 'Описание статьи'
    })
    description: string;

    @ApiProperty({
        type: String,
        description: 'Превью статьи'
    })
    thumbnail: string;

    @ApiProperty({
        type: String,
        description: 'Текст статьи'
    })
    text: string;

    @ApiProperty({
        type: String,
        description: 'Ключевые слова статьи'
    })
    keyWords: string;
}