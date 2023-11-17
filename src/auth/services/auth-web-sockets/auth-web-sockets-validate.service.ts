import { Injectable, Logger } from '@nestjs/common';
import { ValidationError, validate } from 'class-validator';

import {
  LoginWebSocket,
  LoginWebsocketDto,
} from 'src/auth/dto/login-web-sockets.dto';
import {
  SignUpWebSocketsDto,
  SignUpWebSocketsI,
} from 'src/auth/dto/sign-up-web-sockets.dto';

import { AuthWebsocketsFindDataService } from './auth-web-sockets-find-data.service';
import { AuthValidate } from '../auth-validate.interface';

/**
 * валидация данных для модуля сокетов
 */
@Injectable()
export class AuthWebSocketsValidateService extends AuthValidate {
  constructor(
    private readonly authFindDataService: AuthWebsocketsFindDataService,
    private logger: Logger,
  ) {
    super();
  }

  // валидация данных для регистрации пользователя
  async validateSignup({
    user,
  }: {
    user: SignUpWebSocketsI;
  }): Promise<ValidationError[]> {
    const validateUser = new SignUpWebSocketsDto(user);

    const errors = await validate(validateUser);

    return errors;
  }

  async validateLogin({
    usernameOrEmail,
    password,
  }: LoginWebSocket): Promise<ValidationError[]> {
    const validateLogin = new LoginWebsocketDto({ usernameOrEmail, password });
    const errors = await validate(validateLogin);

    return errors;
  }
}
