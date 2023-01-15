import { ApiProperty } from "@nestjs/swagger";
import { Type } from "class-transformer";
import { IsString, ValidateNested } from "class-validator";
import { LanguageDto } from "src/utils/dto/language.dto";

export class CreateMainPageDto {
    @IsString()
    @ApiProperty({
        type: String,
        description: 'Ссылка на картинку в первом блоке на главной странице'
    })
    firstBlockBackgroundImage: string;
  
    @Type(() => LanguageDto)
    @ValidateNested()
    @ApiProperty({
        type: LanguageDto,
        description: 'Заголовок в первом блоке'
    })
    firstBlockTitle: LanguageDto;
  
    @Type(() => LanguageDto)
    @ValidateNested()
    @ApiProperty({
        type: LanguageDto,
        description: 'Подзаголовок в первом блоке'
    })
    firstBlockSubtitle: LanguageDto;
  
    @Type(() => LanguageDto)
    @ValidateNested()
    @ApiProperty({
        type: LanguageDto,
        description: 'Заголовок блока обо мне'
    })
    aboutMeTitle: LanguageDto;
  
    @Type(() => LanguageDto)
    @ValidateNested()
    @ApiProperty({
        type: LanguageDto,
        description: 'Описание блока обо мне'
    })
    aboutMeDescription: LanguageDto;
  
    @IsString()
    @ApiProperty({
        type: String,
        description: 'Ссылка на фото в блоке обо мне'
    })
    aboutMePhoto: string;
}