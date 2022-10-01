import { IsString, Validate } from 'class-validator';
import { CustomLoginValidation } from './login.rule';

export class LoginDto {
    @IsString()
    @Validate(CustomLoginValidation)
    username: string;

    @IsString()
    password: string;
}