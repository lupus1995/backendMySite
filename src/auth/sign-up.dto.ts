import { IsString, Validate } from 'class-validator';
import { CustomUsernameValidation } from './exists-username.rule';

export class SignUpDto {
    @IsString()
    @Validate(CustomUsernameValidation)
    username: number;

    @IsString()
    password: string;

    @IsString()
    confirmPassword: string;
}