import { ApiProperty } from "@nestjs/swagger";
import { IsString } from "class-validator";

export class AccessDto {
    @IsString()
    @ApiProperty({
        type: String,
        description: 'Проверка токена access'
    })
    access: string;
};
