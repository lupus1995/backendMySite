import { Injectable } from '@nestjs/common';
import { ValidationError, validate } from 'class-validator';

import {
  LoginWebSocket,
  LoginWebsocketDto,
} from 'auth/dto/login-web-sockets.dto';
import {
  SignUpWebSocketsDto,
  SignUpWebSocketsI,
} from 'auth/dto/sign-up-web-sockets.dto';

import { AuthValidate } from '../auth-validate.interface';

/**
 * валидация данных для модуля сокетов
 */
@Injectable()
export class AuthWebSocketsValidateService extends AuthValidate {
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
