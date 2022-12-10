import { ApiProperty } from "@nestjs/swagger";
import { IsEmpty, IsString } from "class-validator";

export class FeedbackDto {
    @IsString()
    @ApiProperty({
        type: String,
        description: 'Имя'
    })
    username: string;

    @IsString()
    @ApiProperty({
        type: String,
        description: 'Основной текст'
    })
    text: string;

    @IsEmpty()
    @ApiProperty({
        type: String,
        description: 'Фальшивое поле'
    })
    falseField: string
}