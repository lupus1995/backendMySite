import { HttpException, HttpStatus } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Test } from '@nestjs/testing';
import * as argon2 from 'argon2';
import { AuthRepository } from './auth.repository';
import { AuthService } from './auth.service';
import { AuthTestService } from './auth.test.service';

jest.mock('argon2', () => {
  const module = jest.requireActual('argon2');

  return {
    __esModule: true,
    ...module,
  };
});

describe('auth service', () => {
  let authService: AuthTestService;

  const jwtServiceMock = jest.fn().mockReturnValue({
    sign: jest.fn().mockReturnValue('token'),
    verify: jest.fn((token) => {
      if (
        token === 'refresh token success' ||
        token === 'check token success'
      ) {
        return { sub: true };
      }

      if (token === 'refresh token error' || token === 'check token error') {
        return { sub: false };
      }

      return true;
    }),
  });

  const authRepositoryMock = jest.fn().mockReturnValue({
    findOne: jest.fn().mockReturnValue('uniqUsername'),
    create: jest.fn().mockReturnValue('create'),
  });

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      providers: [
        AuthService,
        {
          provide: JwtService,
          useFactory: jwtServiceMock,
        },
        {
          provide: AuthRepository,
          useFactory: authRepositoryMock,
        },
      ],
    }).compile();

    authService = module.get(AuthService);
  });

  afterEach(() => jest.clearAllMocks());

  it('generateTokens', () => {
    const result = authService.generateTokens({ username: 'username' });

    expect(result).toStrictEqual({
      accessToken: 'token',
      refreshToken: 'token',
    });
  });

  it('check authException', () => {
    const result = () => authService.authException();

    expect(result).toThrow(HttpException);
  });

  it('uniqUsername', async () => {
    const result = await authService.uniqUsername({ username: 'username' });

    expect(result).toBe('uniqUsername');
  });

  it('signup', async () => {
    const result = await authService.signup({
      username: 'username',
      password: 'password',
      confirmPassword: 'password',
    });

    expect(result).toStrictEqual({
      accessToken: 'token',
      refreshToken: 'token',
    });
  });

  it('login success', async () => {
    jest
      .spyOn(argon2, 'verify')
      .mockImplementation(() => new Promise((res) => res(true)));

    const result = await authService.login({
      username: 'username',
      password: 'password',
    });

    expect(result).toStrictEqual({
      accessToken: 'token',
      refreshToken: 'token',
    });
  });

  it('login error', async () => {
    jest
      .spyOn(argon2, 'verify')
      .mockImplementation(() => new Promise((res) => res(false)));

    const result = () =>
      authService.login({
        username: 'username',
        password: 'password',
      });

    await expect(result).rejects.toThrow(
      new HttpException('Логин или пароль некорректы', HttpStatus.FORBIDDEN),
    );
  });

  it('refreshTokens success', async () => {
    const result = await authService.refreshTokens({
      token: 'refresh token success',
    });

    expect(result).toStrictEqual({
      accessToken: 'token',
      refreshToken: 'token',
    });
  });

  it('refreshTokens error', async () => {
    const result = () =>
      authService.refreshTokens({
        token: 'refresh token error',
      });

    await expect(result).rejects.toThrow(
      new HttpException(
        'Для просмотра страницы необходимо авторизоваться',
        HttpStatus.FORBIDDEN,
      ),
    );
  });

  it('check success', async () => {
    const result = await authService.checkToken({
      token: 'check token success',
    });

    expect(result).toBe(true);
  });

  it('check error', async () => {
    const result = authService.checkToken({
      token: 'check token error',
    });

    expect(result).toBe(false);
  });
});
