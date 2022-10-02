import { SignUpDto } from './sign-up.dto';
import { AuthService } from './auth.service';
import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { LoginDto } from './login.dto';
import { ApiCreatedResponse, ApiOkResponse, ApiParam } from '@nestjs/swagger';
import { get } from 'http';

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

    @Get('refresh/:token')
    @ApiParam({type: 'string', name: 'token', description: 'Refresh токен'})
    @ApiOkResponse({ description: 'Обновление пары токенов пользователя' })
    refresh(@Param('token') token: string) {
        return this.authService.refreshTokens({token});
    }
}
