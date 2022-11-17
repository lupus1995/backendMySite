import { ApiProperty } from "@nestjs/swagger";
import { IsString } from "class-validator";

export class AuthorizationDto {
    @IsString()
    @ApiProperty({
        type: String,
        description: 'Проверка токена для авторизации и регистрации'
    })
    authorization: string;
}