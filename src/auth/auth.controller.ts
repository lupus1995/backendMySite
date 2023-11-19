import { Body, Controller, Headers, Param, Post, Res } from '@nestjs/common';
import { ApiCreatedResponse, ApiOkResponse, ApiParam } from '@nestjs/swagger';
import { Response } from 'express';

import { IResponse } from 'src/utils/response/response.type';

import { AUTH_SERVICES } from './auth-enum';
import { AuthService } from './auth.service';
import { AuthorizationDto } from './dto/authorization.dto';
import { TokensService } from '../utils/tokens/tokens.service';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly tokensService: TokensService,
  ) {}

  @ApiCreatedResponse({ description: 'Создание пользователя' })
  @Post(':type/signup')
  async signup(
    @Res() res: Response,
    @Param('type') type: AUTH_SERVICES,
    @Body() newUser: unknown,
  ) {
    const result: IResponse = await this.authService.signup({
      user: newUser,
      type,
    });

    res.status(result.status).json(result);
  }

  @ApiCreatedResponse({ description: 'Авторизация пользователя' })
  @Post(':type/login')
  async login(
    @Res() res: Response,
    @Param('type') type: AUTH_SERVICES,
    @Body() login,
  ) {
    const result: IResponse = await this.authService.login({ login, type });

    res.status(result.status).json(result);
  }

  @Post('access')
  @ApiParam({ type: 'string', name: 'token', description: 'Access токен' })
  @ApiOkResponse({ description: 'Проверка access токена' })
  checkAccessToken(@Headers() { authorization }: AuthorizationDto) {
    return this.tokensService.checkToken({ token: authorization });
  }

  @Post('refresh')
  @ApiParam({ type: 'string', name: 'token', description: 'Refresh токен' })
  @ApiOkResponse({ description: 'Обновление пары токенов пользователя' })
  refresh(@Headers() { authorization }: AuthorizationDto) {
    return this.tokensService.refreshTokens({ token: authorization });
  }
}
