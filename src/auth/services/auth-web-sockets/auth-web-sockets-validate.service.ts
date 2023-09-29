import { Injectable, Logger } from '@nestjs/common';
import { UserWebSocketsRepository } from 'src/auth/repositories/user-web-sockets.repository';
import { AuthValidate } from '../auth-validate.interface';
import { ValidationError, validate, validateSync } from 'class-validator';
import {
  SignUpWebSocketsDto,
  SignUpWebSocketsI,
} from 'src/auth/dto/sign-up-web-sockets.dto';
import {
  LoginWebSocket,
  LoginWebsocketDto,
} from 'src/auth/dto/login-web-sockets.dto';
import { AuthWebsocketsFindDataService } from './auth-web-sockets-find-data.service';

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

  validateLogin({
    usernameOrEmail,
    password,
  }: LoginWebSocket): ValidationError[] {
    const validateLogin = new LoginWebsocketDto({ usernameOrEmail, password });
    const errors = validateSync(validateLogin);

    return errors;
  }
}
