import { ApiProperty } from "@nestjs/swagger";
import { IsString } from "class-validator";

export class CreateMainPageDto {
    @IsString()
    @ApiProperty({
        type: String,
        description: 'Ссылка на картинку в первом блоке на главной странице'
    })
    firstBlockBackgroundImage: string;
  
    @IsString()
    @ApiProperty({
        type: String,
        description: 'Заголовок в первом блоке'
    })
    firstBlockTitle: string;
  
    @IsString()
    @ApiProperty({
        type: String,
        description: 'Подзаголовок в первом блоке'
    })
    firstBlockSubtitle: string;
  
    @IsString()
    @ApiProperty({
        type: String,
        description: 'Заголовок блока обо мне'
    })
    aboutMeTitle: string;
  
    @IsString()
    @ApiProperty({
        type: String,
        description: 'Описание блока обо мне'
    })
    aboutMeDescription: string;
  
    @IsString()
    @ApiProperty({
        type: String,
        description: 'Ссылка на фото в блоке обо мне'
    })
    aboutMePhoto: string;
}