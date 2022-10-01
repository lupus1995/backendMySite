import { ApiProperty } from "@nestjs/swagger";

export class CreateMainPageDto {
    @ApiProperty({
        type: String,
        description: 'Ссылка на картинку в первом блоке на главной странице'
    })
    firstBlockBackgroundImage: string;
  
    @ApiProperty({
        type: String,
        description: 'Заголовок в первом блоке'
    })
    firstBlockTitle: string;
  
    @ApiProperty({
        type: String,
        description: 'Подзаголовок в первом блоке'
    })
    firstBlockSubtitle: string;
  
    @ApiProperty({
        type: String,
        description: 'Заголовок блока обо мне'
    })
    aboutMeTitle: string;
  
    @ApiProperty({
        type: String,
        description: 'Описание блока обо мне'
    })
    aboutMeDescription: string;
  
    @ApiProperty({
        type: String,
        description: 'Ссылка на фото в блоке обо мне'
    })
    aboutMePhoto: string;
}