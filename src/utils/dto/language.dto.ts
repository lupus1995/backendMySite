import { ApiProperty } from "@nestjs/swagger";
import { IsString } from "class-validator";

export class LanguageDto {
    @IsString()
    @ApiProperty({
        type: String,
        description: 'Текст для английского перевода'
    })
    en: string;

    @IsString()
    @ApiProperty({
        type: String,
        description: 'Текст для русского перевода'
    })
    ru: string;
}