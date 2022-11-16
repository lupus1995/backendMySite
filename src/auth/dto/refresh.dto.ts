import { ApiProperty } from "@nestjs/swagger";
import { IsString } from "class-validator";

export class RefreshDto {
    @IsString()
    @ApiProperty({
        type: String,
        description: 'Проверка токена refresh'
    })
    refresh: string;
}