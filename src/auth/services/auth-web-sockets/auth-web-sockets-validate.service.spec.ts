import { Test } from '@nestjs/testing';
import * as classValidator from 'class-validator';

import * as login from 'auth/dto/login-web-sockets.dto';
import * as signup from 'auth/dto/sign-up-web-sockets.dto';

import { AuthWebSocketsValidateService } from './auth-web-sockets-validate.service';

jest.mock('auth/dto/sign-up-web-sockets.dto');
jest.mock('auth/dto/login-web-sockets.dto');

let authWebSocketsValidateService: AuthWebSocketsValidateService;

describe('AuthWebSocketsValidateService', () => {
  beforeEach(async () => {
    const module = await Test.createTestingModule({
      providers: [AuthWebSocketsValidateService],
    }).compile();

    authWebSocketsValidateService = module.get<AuthWebSocketsValidateService>(
      AuthWebSocketsValidateService,
    );
  });

  it('validateSignup', async () => {
    jest
      .spyOn(signup, 'SignUpWebSocketsDto')
      .mockReturnValue({} as signup.SignUpWebSocketsI);
    jest.spyOn(classValidator, 'validate').mockResolvedValue([]);

    const result = await authWebSocketsValidateService.validateSignup({
      user: {} as signup.SignUpWebSocketsI,
    });

    expect(Array.isArray(result)).toBeTruthy();
  });

  it('validateLogin', async () => {
    jest
      .spyOn(login, 'LoginWebsocketDto')
      .mockReturnValue({} as login.LoginWebsocketDto);
    jest.spyOn(classValidator, 'validate').mockResolvedValue([]);

    const result = await authWebSocketsValidateService.validateLogin({
      usernameOrEmail: 'usernameOrEmail',
      password: 'password',
    });

    expect(Array.isArray(result)).toBeTruthy();
  });
});
