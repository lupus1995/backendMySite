import { SignUpDto } from './sign-up.dto';
import { AuthService } from './auth.service';
import { Body, Controller, Post } from '@nestjs/common';
import { LoginDto } from './login.dto';
import { ApiCreatedResponse } from '@nestjs/swagger';

@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService){}

    @ApiCreatedResponse({description: 'Создание пользователя'})
    @Post('signup') 
    signup (@Body() newUser: SignUpDto) {
        return this.authService.signup(newUser);
    }

    @ApiCreatedResponse({description: 'Авторизация пользователя'})
    @Post('login')
    login (@Body() login: LoginDto) {
        return this.authService.login(login);
    }
}
