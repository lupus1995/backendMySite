import { Body, Controller, Headers, Post } from '@nestjs/common';
import { ApiCreatedResponse, ApiOkResponse, ApiParam } from '@nestjs/swagger';
import { AuthService } from './auth.service';
import { AccessDto } from './dto/access.dto';
import { LoginDto } from './dto/login.dto';
import { RefreshDto } from './dto/refresh.dto';
import { SignUpDto } from './dto/sign-up.dto';

@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService) { }

    @ApiCreatedResponse({ description: 'Создание пользователя' })
    @Post('signup')
    signup(@Body() newUser: SignUpDto) {
        return this.authService.signup(newUser);
    }

    @ApiCreatedResponse({ description: 'Авторизация пользователя' })
    @Post('login')
    login(@Body() login: LoginDto) {
        return this.authService.login(login);
    }

    @Post('access')
    @ApiParam({ type: 'string', name: 'token', description: 'Access токен' })
    @ApiOkResponse({ description: 'Проверка access токена' })
    checkAccessToken(@Headers() { access }: AccessDto) {
        return this.authService.checkAccessToken({ token: access })
    }

    @Post('refresh')
    @ApiParam({ type: 'string', name: 'token', description: 'Refresh токен' })
    @ApiOkResponse({ description: 'Обновление пары токенов пользователя' })
    refresh(@Headers() { refresh }: RefreshDto) {
        return this.authService.refreshTokens({ token: refresh });
    }
}
