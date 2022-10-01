import { ApiProperty } from '@nestjs/swagger';
import { IsString, Validate } from 'class-validator';
import { CustomUsernameValidation } from './exists-username.rule';

export class SignUpDto {
    @IsString()
    @Validate(CustomUsernameValidation)
    @ApiProperty({
        type: String,
        description: 'Имя пользователя'
    })
    username: number;

    @IsString()
    @ApiProperty({
        type: String,
        description: 'Пароль пользователя'
    })
    password: string;

    @IsString()
    @ApiProperty({
        type: String,
        description: 'Поле для повторного пароля пользователя'
    })
    confirmPassword: string;
}